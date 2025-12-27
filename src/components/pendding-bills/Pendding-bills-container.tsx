import BillCard from './bill-card';
import { Icon } from '@iconify/react';
import forwardLeftIcon from '@iconify-icons/solar/multiple-forward-left-bold-duotone';
import { Link } from 'react-router-dom';
export default function PenddingBillsContainer() {
  return (
    <div className="grid grid-cols-1 gap-2 items-center">
      <div className="flex items-center justify-between w-full">
        <h2 className="!text-lg !font-medium leading-7">دیون در انتظار</h2>
        <Link to="/pending-bils-list">
          <Icon className="!text-2xl" icon={forwardLeftIcon} />
        </Link>
      </div>
      <div id="bills-container" className="flex flex-col items-center gap-3">
        <BillCard title="Electric Bill" amount={120} image="/profile2.jpg"></BillCard>
        <BillCard title="resturant Bill" amount={420} image="/profile1.jpg"></BillCard>
      </div>
    </div>
  );
}
