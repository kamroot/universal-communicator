import { Tabs } from '@mantine/core';
import { Photo, MessageCircle, Settings } from 'tabler-icons-react';


const History = () => { 
  return (
    <div> 
      <h1> History </h1>
      <Tabs>
      <Tabs.Tab label="Gallery" icon={<Photo size={14} />}>Gallery tab content</Tabs.Tab>
      <Tabs.Tab label="Messages" icon={<MessageCircle size={14} />}>Messages tab content</Tabs.Tab>
      <Tabs.Tab label="Settings" icon={<Settings size={14} />}>Settings tab content</Tabs.Tab>
    </Tabs>
    </div>
  )
}
export default History;