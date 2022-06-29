import { Button } from '@mantine/core';
import { VideoConference } from '@signalwire-community/react';
// import { Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarEvent, FilePhone, Armchair } from 'tabler-icons-react';
import VideoSpace from './VideoSpace';

export type PalapaInterface = {
  name: string;
  currentMemberCount?: number;
  description: string;
  visitorName: string;
  palapaType: 'event room' | 'phone booth' | 'meeting room';
};

const PalapaCard = ({ name, visitorName, description, currentMemberCount, palapaType }: PalapaInterface) => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const getPalapalToken = async () => {

    const url = 'http://localhost:4500/palapas/token';
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //Authorization: auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        palapaName: name,
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
    getPalapalToken();
  }, []);


  const clickHandler = (event: any) => {
    navigate(`/video/${token}`);
  };


  return (
    <>
      <div className='bg-teal-50 my-8 w-1/2 mx-auto rounded-md  h-48'>

        <div className="h-10 bg-zinc-50 grid grid-cols-10 py-auto">
          <div className="col-span-2 bg-zinc-200 rounded-sm">
            {palapaType === 'event room' && <CalendarEvent className="h-8 w-8" />}
            {palapaType === 'phone booth' && <FilePhone className="h-8 w-8" />}
            {palapaType === 'meeting room' && <Armchair className="h-8 w-8" />}
          </div>
          <div className="col-span-7"> {name} / {currentMemberCount} members </div>
        </div>
        <div> {description} </div>

        <Button onClick={clickHandler}>
          Click me
        </Button>
      </div>
    </>
  );
};

export default PalapaCard;


