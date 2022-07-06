import MeetingspaceCard, { MeetingspaceInterface } from './MeetingspaceCard';
import { useEffect, useState } from 'react';

type MeetingspaceListInterface = {
  visitorName: string;
};

export const MeetingspaceList = ({ visitorName }: MeetingspaceListInterface) => {
  const initList: MeetingspaceInterface[] = [];

  const [meetingspaceList, setMeetingspaceList] = useState(initList);
  const test = 4;

  const getPalaList = async () => {
    //  console.log('getPalaList');
    const url = `${process.env.REACT_APP_SERVER_URL}/meetingspace/`;
    const options = {
      method: 'GET',
      // mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(url, options);
      // console.log('response list ', response);
      if (response.status != 200) {
        throw new Error(
          `Failed to get meetingspace list. URL ${url} with status ${response.status} and text ${response.statusText}`,
        );
      }

      const json = await response.json();
      console.log('meetingspaceList', json);
      setMeetingspaceList(json);
      console.log('after', json);
      //  palapaList.push(...data);
    } catch (error) {
      console.log('error in getting meetingspaceList', error);
    }
    // console.log('done with getPalaList');
  };

  useEffect(() => {
    // get list of Palapas
    getPalaList();
  }, []);

  return (
    <div>
      <h1> List of Meeting Spaces </h1>

      <div className="flex flex-wrap">
        {meetingspaceList.map((meetingspaceDetails) => (
          <MeetingspaceCard
            name={meetingspaceDetails.name}
            description={meetingspaceDetails.description}
            currentMemberCount={meetingspaceDetails.currentMemberCount}
            visitorName={visitorName}
            meetingspaceType={meetingspaceDetails.meetingspaceType}
          />
        ))}
      </div>
    </div>
  );
};
