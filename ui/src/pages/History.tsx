import { Tabs } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Photo, MessageCircle, Settings } from 'tabler-icons-react';
import DataTable from 'react-data-table-component';

const History = () => {
  type HistoryInterface = {
    summary: any;
    video: [
      {
        charge: number;
        charge_details: [];
        created_at: Date;
        room_name: string;
      },
    ];
  };
  const [history, setHistory] = useState<HistoryInterface>(null);

  const getHistory = () => {
    const url = `${process.env.REACT_APP_SERVER_URL}/history`;
    const options = {
      method: 'GET',
      // mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(url, options)
      .then((response) => {
        if (response.status != 200) {
          throw new Error(
            `Failed to get history. URL ${url} with status ${response.status} and error ${response.statusText}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        setHistory(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  const columns = [
    {
      name: 'Title',
      selector: (row) => row.room_name,
      sortable: true,
    },
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: false,
    },
  ];

  return (
    <div>
      <h1> History </h1>
      {history ? <DataTable columns={columns} data={history.video} /> : <div>no history found</div>}
    </div>
  );
};
export default History;
