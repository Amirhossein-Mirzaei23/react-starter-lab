import { Link } from 'react-router-dom';
import { useHeaderStore, useNavigationStore } from '@/app/store';
import React from 'react';
import ProfileMenuList from '../../profile/components/profile-menu/profile-menu';
import FriendsList from '../components/friends-list';
export default function FriendshipListPage() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const toggleBackButton = useHeaderStore((s) => s.toggleBackButton);
  const sethasBackground = useHeaderStore((s) => s.sethasBackground);
  const setAvatar = useHeaderStore((s) => s.hasAvatar);
  const showNavBar = useNavigationStore((s) => s.showNav);
  React.useEffect(() => {
    setTitle('');
    toggleBackButton(false);
    sethasBackground(false);
    setAvatar(true);
    showNavBar();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8">
      <FriendsList />
    </div>
  );
}
