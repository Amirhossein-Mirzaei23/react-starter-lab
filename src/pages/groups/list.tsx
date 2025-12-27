import { Link } from 'react-router-dom';
import { useHeaderStore } from '../../stores/headerStore/headerStore';
import React from 'react';
import { useNavigationStore } from '../../stores/navigationStore/navigationStore';
import GroupsList from '../../components/groups/list';

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
