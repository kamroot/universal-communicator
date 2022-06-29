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
        />
  )
}

export default VideoSpace;