import Palapa, { PalapaInterface } from './Palapa';
import { useEffect, useState } from 'react';

type PalapaListInterface = {
  name: string;
  token: string;
};

export const PalapaList = ({ name, token }: PalapaListInterface) => {
  const initList: PalapaInterface[] = [];

  const [palapaList, setPalapaList] = useState(initList);
  const test = 4;

  const getPalaList = async () => {
    //  console.log('getPalaList');
    const url = 'http://localhost:4500/palapas/';
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

      {palapaList.map((palapaDetails) => (
        <Palapa
          name={palapaDetails.name}
          description={palapaDetails.description}
          currentMemberCount={palapaDetails.currentMemberCount}
          visitorName="aseem asthana"
          palapaType={palapaDetails.palapaType}
        />
      ))}
    </div>
  );
};