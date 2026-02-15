import { useHeaderStore, useNavigationStore } from '@/app/store';
import React from 'react';
import GroupDetail from '../components/detail/groupDetail';

export default function GroupDetailPage() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const toggleBackButton = useHeaderStore((s) => s.toggleBackButton);
  const sethasBackground = useHeaderStore((s) => s.sethasBackground);
  const setAvatar = useHeaderStore((s) => s.hasAvatar);
  const showNavBar = useNavigationStore((s) => s.showNav);
  React.useEffect(() => {
    setTitle('');
    toggleBackButton(true);
    sethasBackground(false);
    setAvatar(false);
    showNavBar();
  }, []);

  return <GroupDetail />;
}
