import { useHeaderStore, useNavigationStore } from '@/app/store';
import React from 'react';
import ProfileDetail from '../../components/profile/profile-deatail/profile-detail';

export default function ProfileDetailPage() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const toggleBackButton = useHeaderStore((s) => s.toggleBackButton);
  const sethasBackground = useHeaderStore((s) => s.sethasBackground);
  const setAvatar = useHeaderStore((s) => s.hasAvatar);
  const showNavBar = useNavigationStore((s) => s.showNav);
  const setStickyPostion = useHeaderStore((s) => s.setStickyPostion);
  React.useEffect(() => {
    setTitle('جزییات حساب کاربری');
    toggleBackButton(true);
    sethasBackground(true);
    setStickyPostion(true);
    setAvatar(false);
    showNavBar();
  }, []);

  return <ProfileDetail />;
}
