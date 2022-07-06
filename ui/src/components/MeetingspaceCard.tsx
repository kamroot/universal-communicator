import { Button } from '@mantine/core';
import { VideoConference } from '@signalwire-community/react';
// import { Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarEvent, FilePhone, Armchair } from 'tabler-icons-react';
import VideoSpace from './VideoSpace';

export type MeetingspaceInterface = {
  name: string;
  currentMemberCount?: number;
  description: string;
  visitorName: string;
  meetingspaceType: 'event room' | 'phone booth' | 'meeting room';
};

const MeetingspaceCard = ({
  name,
  visitorName,
  description,
  currentMemberCount,
  meetingspaceType: meetingspaceType,
}: MeetingspaceInterface) => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const getMeetingspaceToken = async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/meetingspace/token`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //Authorization: auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meetingspaceName: name,
        visitorName: visitorName,
      }),
    };

    try {
      const response = await fetch(url, options);
      // console.log('response token ', response);
      const json = await response.text();
      console.log(`Token for ${name} is `, json);
      setToken(json);
      //console.log('after', palapaList);
      //  palapaList.push(...data);
    } catch (error) {
      console.log('error in getting Token', error);
    }
  };

  useEffect(() => {
    getMeetingspaceToken();
  }, []);

  const clickHandler = (event: any) => {
    navigate(`/video/${token}`);
  };

  return (
    <>
      <div className="my-8 bg-black mx-auto rounded-md  h-48 w-64 hover:bg-slate-800" onClick={clickHandler}>
        <div className="bg-red-800 h-8 px-2 rounded-tl-md rounded-tr-md text-white font-sans font-semibold">{name}</div>
        <div>
          <span className="text-white">
            {description} with {currentMemberCount} people in it
          </span>
        </div>
      </div>
    </>
  );
};

export default MeetingspaceCard;
