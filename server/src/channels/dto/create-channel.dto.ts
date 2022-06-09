enum ChannelType {
  AudioOnly,
  ChatOnly,
  Video,
  VideoChat,
  All
}

export class CreateChannelDto {
  channelName: string;
  channelType: ChannelType;
  displayName: string;
  user: string;

}

