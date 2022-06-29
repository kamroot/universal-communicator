import { VideoConference } from '@signalwire-community/react';
import { useParams } from 'react-router-dom';


const VideoSpace = () => {
  const token = useParams().token as string;
  return (
    <VideoConference
          token={token}
          // userName={visitorName}
          memberList={true}
          onRoomReady={(rs) => console.log('Room is ready!', rs)}
          onMemberLeft={(member) => console.log('Member left!', member.member.name)}
        />
  )
}

export default VideoSpace;