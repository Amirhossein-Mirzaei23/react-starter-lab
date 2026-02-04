import { FriendDto } from '../../api/users/user.types';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
type props = {
  title: string;
  image: string;
  dateStr?: string;
};

export default function BillCardTitle({ title, image, dateStr }: props) {
  return (
    <div className="flex flex-row-reverse items-center gap-2">
      <AvatarGroup>
        <Avatar.Root size="2xl">
          <Avatar.Fallback name={image || title} />
          <Avatar.Image src={image} />
        </Avatar.Root>
      </AvatarGroup>
      <div className="flex flex-col items-end  text-slate-800">
        <p className="!text-sm !font-medium leading-7">{title}</p>
        {dateStr && <p className="!text-xs  !font-light leading-5">{dateStr}</p>}
      </div>
    </div>
  );
}
