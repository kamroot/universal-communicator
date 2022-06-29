import react from 'react';
import { UserButton } from "@clerk/clerk-react";
import DropDownMenu from './DropDownMenu';

const Header = () => {
  return (
    <div id="header" className="bg-teal-400 h-20 relative top-0 text-center grid grid-cols-4">
      <div className="text-2xl font-bold m-auto px-24 py-8 col-span-3 my-auto">
        Welcome to SignalWire Programmable Video Conference
      </div>
      <div className="my-auto">
        <UserButton />
        <DropDownMenu />
      </div>
    </div>
  );

};
export default Header;
