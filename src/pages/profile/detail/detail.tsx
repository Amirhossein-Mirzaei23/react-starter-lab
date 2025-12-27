import { Link } from 'react-router-dom';
import { useHeaderStore } from '../../../stores/headerStore/headerStore';
import React from 'react';
import { useNavigationStore } from '../../../stores/navigationStore/navigationStore';
import ProfileDetail from '../../../components/profile/profile-deatail/profile-detail';

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
