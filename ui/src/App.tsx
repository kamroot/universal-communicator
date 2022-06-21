import React from 'react';
import './App.css';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser, RedirectToSignIn } from '@clerk/clerk-react';
import { VideoConference } from '@signalwire-community/react';

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;
const SW_TOKEN = process.env.REACT_APP_SIGNALWIRE_TOKEN ? process.env.REACT_APP_SIGNALWIRE_TOKEN : '';

function App() {
  const navigate = useNavigate();

  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => navigate(to)}>
      <SignedIn>
        <MainPage />
     
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}


const MainPage = () => {
   const { user } = useUser();
   const name = user? user.firstName + ' ' + user.lastName : 'We don\'t know your name';

  return (
    <div className="App">
    <Header />
    <div id="main" className=" flex flex-row h-screen">
      <div id="main-container" className="bg-gray-200 w-4/5 px-4">
        <VideoConference
        token={SW_TOKEN}
        userName={name}
        memberList={true}
        onRoomReady={(rs) => console.log("Room is ready!", rs)}
      />

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
  </div>
  )
}


export default App;
