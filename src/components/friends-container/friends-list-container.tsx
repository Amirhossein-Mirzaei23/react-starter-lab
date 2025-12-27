import { Icon } from '@iconify/react';
import forwardLeftIcon from '@iconify-icons/solar/multiple-forward-left-bold-duotone';
import FriendCard from './friendCard';
import { Link } from 'react-router-dom';
export default function FriendsListContainer() {
  return (
    <div className="grid grid-cols-1 gap-2 items-center">
      <div className="flex items-center justify-between w-full">
        <span className="!text-lg !font-medium leading-7">دوستان</span>
        <Link to="/friends-list">
          <Icon className="!text-2xl" icon={forwardLeftIcon} />
        </Link>
      </div>
      <div id="bills-container" className="flex flex-col items-center gap-3">
        <FriendCard title="Ali" amount={120} image="/profile2.jpg" status="debt"></FriendCard>
        <FriendCard title="zahra" amount={420} image="/profile1.jpg" status="credit"></FriendCard>
      </div>
    </div>
  );
}
