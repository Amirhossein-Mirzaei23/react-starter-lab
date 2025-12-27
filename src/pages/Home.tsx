import FinancePreviewTable from '../components/finance-preview-table';
import PenddingBillsContainer from '../components/pendding-bills/Pendding-bills-container';
import FriendsListContainer from '../components/friends-container/friends-list-container';
import { useHeaderStore } from '../stores/headerStore/headerStore';
import React from 'react';
import { useNavigationStore } from '../stores/navigationStore/navigationStore';
export default function Home() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const toggleBackButton = useHeaderStore((s) => s.toggleBackButton);
  const sethasBackground = useHeaderStore((s) => s.sethasBackground);
  const setAvatar = useHeaderStore((s) => s.hasAvatar);
  const showNavBar = useNavigationStore((s) => s.showNav);
  const setStickyPostion = useHeaderStore((s) => s.setStickyPostion);
  React.useEffect(() => {
    setTitle('');
    toggleBackButton(false);
    sethasBackground(false);
    setStickyPostion(false);
    setAvatar(true);
    showNavBar();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 !pb-6">
      <FinancePreviewTable />
      <PenddingBillsContainer />
      <FriendsListContainer />
    </div>
  );
}
