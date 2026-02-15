import { Link } from 'react-router-dom';
import { useHeaderStore, useNavigationStore } from '@/app/store';
import React from 'react';
import FriendshipRequestList from '../components/friendship-requests/list';

export default function FriendshipRequestsListPage() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const toggleBackButton = useHeaderStore((s) => s.toggleBackButton);
  const sethasBackground = useHeaderStore((s) => s.sethasBackground);
  const setAvatar = useHeaderStore((s) => s.hasAvatar);
  const showNavBar = useNavigationStore((s) => s.showNav);
  React.useEffect(() => {
    setTitle('لیست درخواست ها');
    toggleBackButton(true);
    sethasBackground(false);
    setAvatar(false);
    showNavBar();
  }, []);

  return <FriendshipRequestList />;
}
