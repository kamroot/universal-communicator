import PalapaCard, { PalapaInterface } from './PalapaCard';
import { useEffect, useState } from 'react';

type PalapaListInterface = {
  visitorName: string;
};

export const PalapaList = ({ visitorName }: PalapaListInterface) => {
  const initList: PalapaInterface[] = [];

  const [palapaList, setPalapaList] = useState(initList);
  const test = 4;

  const getPalaList = async () => {
    //  console.log('getPalaList');
    const url = `${process.env.REACT_APP_SERVER_URL}/palapas/`;
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

      const json = await response.json();
      console.log('palapaList', json);
      setPalapaList(json);
      // console.log('after', palapaList);
      //  palapaList.push(...data);
    } catch (error) {
      console.log('error in getting palapaList', error);
    }
    // console.log('done with getPalaList');
  };

  useEffect(() => {
    // get list of Palapas
    getPalaList();
  }, []);

  return (
    <div>
      <h1> List of Palapas </h1>

      <div className="flex flex-wrap">
        {palapaList.map((palapaDetails) => (
          <PalapaCard
            name={palapaDetails.name}
            description={palapaDetails.description}
            currentMemberCount={palapaDetails.currentMemberCount}
            visitorName={visitorName}
            palapaType={palapaDetails.palapaType}
          />
        ))}
      </div>
    </div>
  );
};
