import React from 'react';
import './App.css';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser, RedirectToSignIn } from '@clerk/clerk-react';
import { PalapaList } from './components/PalapaList';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.76/dist/');

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
   const SW_TOKEN = process.env.REACT_APP_SIGNALWIRE_TOKEN ? process.env.REACT_APP_SIGNALWIRE_TOKEN : '';  
   return (
    <div className="App">
    <Header />
    <div id="main" className=" flex flex-row h-screen">
      <div id="main-container" className="bg-gray-200 w-4/5 px-4">
      <PalapaList name={name} token={SW_TOKEN} />

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
