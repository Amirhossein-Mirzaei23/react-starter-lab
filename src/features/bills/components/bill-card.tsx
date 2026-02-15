import { Avatar, AvatarGroup, Separator } from '@chakra-ui/react';
import { FriendDto } from '../../users/api/user.types';
import BillCardTitle from './bill-card-title';

interface props {
  title: string;
  amount: number;
  image: string;
  date?: number;
  onSelect?: void;
  status?: string;
  billGroup?: FriendDto[];
}
function dateToString(date: number) {
  return 'Mar 24, 2034';
}

export default function BillCard({ title, amount, image }: props) {
  return (
    <div className="bg-slate-100 w-full !p-2 rounded-2xl grid grid-cols-1 gap-2">
      <div className="flex justify-between items-center">
        <p className="!text-xl !font-bold text-slate-950">{amount}$</p>
        <BillCardTitle
          title={title}
          image={image}
          dateStr={dateToString(1763968204824)}
        ></BillCardTitle>
      </div>
      <Separator className=" !border-slate-800 !opacity-20" />
      <div className="flex items-center justify-end">
        <div>
          <span></span>
        </div>
        <AvatarGroup>
          <Avatar.Root size="md">
            <Avatar.Fallback name={title} />
            <Avatar.Image src="/profile3.jpg" />
          </Avatar.Root>
          <Avatar.Root size="md">
            <Avatar.Fallback name={title} />
            <Avatar.Image src="/profile1.jpg" />
          </Avatar.Root>
        </AvatarGroup>
      </div>
    </div>
  );
}
