import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser, RedirectToSignIn } from '@clerk/clerk-react';
import '@shoelace-style/shoelace/dist/themes/light.css';
import MainPage from './pages/MainPage';
import History from './pages/History';
import VideoSpace from './components/VideoSpace';

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function App() {
  const navigate = useNavigate();
  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => navigate(to)}>
      <SignedIn>
        <div className="h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/video/:token" element={<VideoSpace />} />
          </Routes>
          <Header />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
