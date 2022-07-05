import { UserButton } from '@clerk/clerk-react';
import DropDownMenu from './DropDownMenu';

const Header = () => {
  return (
    <div id="header" className="bg-red-400 h-12 relative top-0 text-center grid grid-cols-4">
      <div className="text-xl font-light my-auto  col-span-3">SignalWire Meeting Spaces</div>
      <div className="my-auto">
        <UserButton />
        <DropDownMenu />
      </div>
    </div>
  );
};
export default Header;
