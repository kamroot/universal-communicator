// import { Exclude } from 'class-transformer';

export class Channel {
  name: string;
  type: string;
  displayName: string;
  authToken: string;
  constructor(partial: Partial<Channel>) {
    Object.assign(this, partial);
  }
}
