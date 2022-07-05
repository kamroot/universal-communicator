import { PalapaList } from '../components/PalapaList';
import { useUser } from '@clerk/clerk-react';

const MainPage = () => {
  const { user } = useUser();

  const visitorName = user ? user.firstName + ' ' + user.lastName : "We don't know your name";

  return (
    <div id="main-container" className="bg-gray-200 h-full px-4">
      <PalapaList visitorName={visitorName} />
    </div>
  );
};

export default MainPage;
