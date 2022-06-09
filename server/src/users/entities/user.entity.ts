// import { Exclude } from 'class-transformer';

export class User {

  fullName: string;
  email: string;
  auth: {
    SWjwtToken_v2: string;
    SWjwtToken_v3: string;
    SWUser: string;
    StreamUserToken: string;
  };
  endpoints: {
    sw_app_endpoint: string,
    phone_numbers: { number: string }[],
    
  };

  // @Exclude()
  // password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export default User;
