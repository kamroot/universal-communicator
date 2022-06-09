import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Logger } from '@nestjs/common';
import { Channel } from './entities/channel.entity';
import { timeStamp } from 'console';

@Injectable()
export class ChannelsService {
  private channelList: Channel[] = [];
  private logger: Logger = new Logger('AppGateway');

  constructor(private httpService: HttpService) {}

  async create(createChannelDto: CreateChannelDto): Promise<Channel> {
    const auth = {
      username: process.env.APP_SW_PROJECT_ID, // Project-ID
      password: process.env.APP_SW_API_TOKEN, // API token
    };
    const apiurl_v3 = `https://${process.env.APP_SPACE_NAME}.signalwire.com/api/video/room_tokens`;

    this.logger.log(`Making new video room by calling ${apiurl_v3}`);
    this.logger.log(
      `room name ${createChannelDto.channelName} and username ${createChannelDto.user}`,
    );
    this.logger.log(`Calling ${apiurl_v3}`);
    try {
    const ret_v3 = await this.httpService
      .post(
        apiurl_v3,
        {
          room_name: createChannelDto.channelName,
          user_name: createChannelDto.user,
        },
        { auth },
      )
      .toPromise();
    this.logger.log(`Successs in creating v3 token`);
    this.logger.log(`Got ${ret_v3.data.jwt_token}`);

    const c: Channel = {
      name: createChannelDto.channelName,
      type: '-',
      displayName: createChannelDto.channelName,
      authToken: ret_v3.data.jwt_token,
    };
    this.channelList.push(c);
    this.logger.log(`Added new channel ${c.name}`);
    return c;
  }  catch (e) {
      this.logger.log(`Failed to create JWT Token with error ${e}`);
      throw new NotFoundException(`Error creating token ${e}`);
    }
    
  }

  findAll(): Channel[] {
    this.logger.log(`Returning list of ${this.channelList.length} channels`);
    return this.channelList;
  }

  findOne(id: number) {
    return `This action returns a #${id} channel`;
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
