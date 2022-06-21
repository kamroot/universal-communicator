import { VideoConference } from "@signalwire-community/react";
import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { useState } from "react";

export type PalapaInterface = {
  name: string;
  currentMemberCount: number;
  description: string;
  token: string;
}

const Palapa = ({name, description, token, currentMemberCount}: PalapaInterface) => {



  const [videoEnabled, setVideoEnabled] = useState(false);

  const clickHandler = (event: any) => {
    console.log(event);
    setVideoEnabled(!videoEnabled);
  }
  return (<>
  <div>

  
  <h2> Palala {name} with {currentMemberCount} members</h2>
  {description}
  <SlButton variant="primary" onClick={clickHandler}>Click me</SlButton>;
    </div>

    {videoEnabled && 
   <VideoConference
        token={token}
        userName={name}
        memberList={true}
        onRoomReady={(rs) => console.log('Room is ready!', rs)}
      /> } 
  </>)
}

export default Palapa;