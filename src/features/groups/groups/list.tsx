import { useHeaderStore, useNavigationStore } from '@/app/store';
import React from 'react';
import GroupsList from '../components/list';

export default function GroupsListPage() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const toggleBackButton = useHeaderStore((s) => s.toggleBackButton);
  const sethasBackground = useHeaderStore((s) => s.sethasBackground);
  const setAvatar = useHeaderStore((s) => s.hasAvatar);
  const showNavBar = useNavigationStore((s) => s.showNav);
  React.useEffect(() => {
    setTitle('گروه های شما');
    toggleBackButton(false);
    sethasBackground(false);
    setAvatar(true);
    showNavBar();
  }, []);

  return <GroupsList />;
}
