import { PalapaList } from "../components/PalapaList";
import {  useUser } from '@clerk/clerk-react';


const MainPage = () => {
  const { user } = useUser();

  const visitorName = user ? user.firstName + ' ' + user.lastName : 'We don\'t know your name';

  return (
    <div id="main" className=" flex flex-row h-screen">
      
      <div id="main-container" className="bg-gray-200 w-4/5 px-4">
        <PalapaList visitorName={visitorName} />

      </div>

      <div id="video-root" className="grow basis-1"></div>
      <div
        id="side-bar"
        className="grow-0 basis-1/5 p-4 invisible md:visible flex flex-col justify-between min-h-screen  bg-green-50"
      >
        <div id="talking-time" className="pb-8 font-bold">
          New
        </div>
      </div>
    </div>

  );
}

export default MainPage;