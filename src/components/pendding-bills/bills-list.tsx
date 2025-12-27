import BillCard from './bill-card';

import { Link } from 'react-router-dom';
import { useHeaderStore } from '../../stores/headerStore/headerStore';
import React from 'react';
export default function BillsList() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const toggleBackButton = useHeaderStore((s) => s.toggleBackButton);
  const sethasBackground = useHeaderStore((s) => s.sethasBackground);
  const setAvatar = useHeaderStore((s) => s.hasAvatar);
  React.useEffect(() => {
    setTitle('Your Bills');
    toggleBackButton(true);
    sethasBackground(true);
    setAvatar(false);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2 items-center">
      <div id="bills-container" className="flex flex-col items-center gap-3">
        <BillCard title="Electric Bill" amount={120} image="/profile2.jpg"></BillCard>
        <BillCard title="resturant Bill" amount={420} image="/profile1.jpg"></BillCard>
        <BillCard title="Electric Bill" amount={120} image="/profile2.jpg"></BillCard>
        <BillCard title="resturant Bill" amount={420} image="/profile1.jpg"></BillCard>
        <BillCard title="Electric Bill" amount={120} image="/profile2.jpg"></BillCard>
        <BillCard title="resturant Bill" amount={420} image="/profile1.jpg"></BillCard>
        <BillCard title="Electric Bill" amount={120} image="/profile2.jpg"></BillCard>
        <BillCard title="resturant Bill" amount={420} image="/profile1.jpg"></BillCard>
        <BillCard title="Electric Bill" amount={120} image="/profile2.jpg"></BillCard>
        <BillCard title="resturant Bill" amount={420} image="/profile1.jpg"></BillCard>
      </div>
    </div>
  );
}
