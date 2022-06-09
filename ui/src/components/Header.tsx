import react from 'react';
import { UserButton } from "@clerk/clerk-react";


const Header = () => {
  return (
    <div id="header" className="bg-teal-400 h-20 relative top-0 text-center">
      <div className="text-3xl font-bold m-auto px-24 py-8">
        Welcome to SignalWire Programmable Video Conference
        <UserButton />
      </div>
    </div>
  );

  };
export default Header;
