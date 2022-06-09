import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as EmailValidator from 'email-validator';
import { Logger } from '@nestjs/common';
const md5 = require('md5');
import { connect } from 'getstream';

@Injectable()
export class UsersService {
  private userlist: User[] = [];
  private logger: Logger = new Logger('User Service');

  constructor(private httpService: HttpService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(
      `Got request for ${createUserDto.name} and email ${createUserDto.email}`,
    );

    // Basic error checking. The client has to pass in both a name and a valid email address
    if (!EmailValidator.validate(createUserDto.email)) {
      this.logger.log(`${createUserDto.email} is not a valid email`);
      throw new BadRequestException(
        `${createUserDto.email} is not a valid email or you did not pass in an email address`,
      );
    }

    if (createUserDto.name === undefined) {
      this.logger.log(`${createUserDto.email} is not a valid email`);
      throw new BadRequestException(`name is a required parameter`);
    }

    // if the user exists then we don't have to create the user
    const user = this.userlist.find(
      (user) => user.email === createUserDto.email,
    );
    if (user) {
      this.logger.warn(`User with email ${createUserDto.email} exists`);
      return user;
    }

    // Now we will connect with SignalWire to get the JWT token for this user
    // get ready to make a call to SignalWire to get a JWT Token
    const app_endpoint = md5(createUserDto.email);
    let relay_v2_token = await this.getRelayV2JWTToken(
      app_endpoint,
      createUserDto.email,
    );
    let relay_v3_token = await this.getRelayV3JWTToken(
      createUserDto.name,
      md5(createUserDto.email),
    );
    const u: User = {
      fullName: createUserDto.name,
      email: createUserDto.email,
      auth: {
        SWjwtToken_v2: relay_v2_token,
        SWjwtToken_v3: relay_v3_token,
        SWUser: process.env.APP_SW_PROJECT_ID, // Signalwire project ID
        StreamUserToken: this.getStreamToken(createUserDto.email),
      },
      endpoints: {
        sw_app_endpoint: app_endpoint,
        phone_numbers: [
          { number: '+1 (202) 221-4972' },
          { number: '+1 (234) 255-0187' },
          { number: '+1 (650) 250-5133' },
        ],
      },
    };
    this.userlist.push(u);
    return u;
  }

  async find(email: string): Promise<User> {
    this.logger.log(`Got request for creds for email ${email}`);

    // Basic error checking. The client has to pass in both a name and a valid email address
    if (!EmailValidator.validate(email)) {
      this.logger.log(`${email} is not a valid email`);
      throw new BadRequestException(
        `${email} is not a valid email or you did not pass in an email address`,
      );
    }

    // now let's find this user in our database
    const user = this.userlist.find((u) => u.email === email);
    if (!user) {
      this.logger.warn(`Could not find user with email ${email}`);
      throw new BadRequestException(`Could not find user with email ${email}`);
    }

    // Now we will connect with SignalWire to get the JWT token for this user
    // get ready to make a call to SignalWire to get a JWT Token
    const app_endpoint = md5(email);
    let relay_v2_token = await this.getRelayV2JWTToken(app_endpoint, email);
    let relay_v3_token = await this.getRelayV3JWTToken(
      user.fullName,
      app_endpoint,
    );
    const u: User = {
      email: email,
      fullName: user.fullName,
      auth: {
        SWjwtToken_v2: relay_v2_token,
        SWjwtToken_v3: relay_v3_token, //TODO - remove this completely
        SWUser: process.env.APP_SW_PROJECT_ID, // Signalwire project ID
        StreamUserToken: this.getStreamToken(email),
      },
      endpoints: {
        sw_app_endpoint: app_endpoint,
        phone_numbers: user.endpoints.phone_numbers,
      },
    };

    return u;
  }
  async getRelayV3JWTToken(
    user_name: string,
    app_endpoint: string,
  ): Promise<string> {
    const apiurl_v2 = `https://${process.env.APP_SPACE_NAME}.signalwire.com/api/video/room_tokens`;

    const auth = {
      username: process.env.APP_SW_PROJECT_ID, // Project-ID
      password: process.env.APP_SW_API_TOKEN, // API token
    };

    try {
      // generate v2 token
      const ret_v3 = await this.httpService
        // @ts-ignore
        .post(apiurl_v2, { user_name, room_name: app_endpoint }, { auth })
        .toPromise();
      const data = await ret_v3.data;
      this.logger.log('!!!!!v3 token is:', data.token);
      return data.token;
    } catch (e) {
      this.logger.log(`Failed  JWT Token 3 for ${user_name} with error ${e}`);
      throw new NotFoundException(`Error creating token ${e}`);
    }
  }

  async getRelayV2JWTToken(
    app_endpoint: string,
    email: string,
  ): Promise<string> {
    // we are going to create a SignalWire JS SDK V2 token.
    // https://docs.signalwire.com/topics/relay-sdk-jwt-auth/#authentication-using-jwt-security-resource
    const apiurl_v3 = `https://${process.env.APP_SPACE_NAME}.signalwire.com/api/relay/rest/jwt`;

    const auth = {
      username: process.env.APP_SW_PROJECT_ID, // Project-ID
      password: process.env.APP_SW_API_TOKEN, // API token
    };

    try {
      // generate v2 token
      this.logger.log(
        `Calling ${apiurl_v3} with project ${auth.username} and ${auth.password}`,
      );
      const ret_v3 = await this.httpService
        .post(apiurl_v3, { resource: app_endpoint }, { auth })
        .toPromise();
      this.logger.log(`Successs in creating v2 token ${ret_v3.data.jwt_token}`);
      return ret_v3.data.jwt_token;
    } catch (e) {
      this.logger.log(
        `Failed to create Relay V2 JWT Token for ${email} with error ${e}`,
      );
      throw new NotFoundException(`Error creating token ${e}`);
    }
  }

  getStreamToken(email: string): string {
    const api_key = process.env.APP_STREAM_KEY;
    const api_secret = process.env.APP_STREAM_SECRET_KEY;
    const stream_app = process.env.APP_STREAM_APP_ID;
    // Instantiate a new client (server side)
    const streamclient = connect(api_key, api_secret, stream_app);

    // Create a token for user with id "the-user-id"
    const userToken = streamclient.createUserToken(md5(email));
    this.logger.verbose(`Got stream token for ${md5(email)} as ${userToken}`);
    return userToken;
  }

  findAll() {
    this.logger.log(`Returning list of ${this.userlist.length} users`);
    return this.userlist;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
