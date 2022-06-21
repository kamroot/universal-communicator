import Palapa, { PalapaInterface} from './Palapa'

type PalapaListInterface = {
  name: string;
  token: string;
};

export const PalapaList = ({ name, token }: PalapaListInterface) => {
  const palapaList: PalapaInterface[] = [
    {
      name: 'aseem',
      token: token,
      description: 'aseems room. all are welcome',
      currentMemberCount: 5,
    },
  ];

  return (
    <div>
      <h1> List of Palapas </h1>

      {palapaList.map(palapaDetails => <Palapa name={palapaDetails.name} token={palapaDetails.token} description={palapaDetails.description} currentMemberCount={palapaDetails.currentMemberCount} />)}

   
    </div>
  );
};
