import { Avatar, AvatarGroup, Button, Separator } from '@chakra-ui/react';
import { FriendDto } from '../../api/users/user.types';
import { Icon } from '@iconify/react';
import heartsBoldIcon from '@iconify-icons/solar/hearts-bold';

import { ReactNode } from 'react';
import BillCardTitle from '../pendding-bills/bill-card-title';
import addUserIcon from '@iconify-icons/solar/add-circle-bold';
import { CreateGroupBottomSheetContent } from '../bottom-sheet-contents/createGroups/create-group-content';
import { useBottomSheetStore } from '../../stores/bottomSheetStore';
import { Link } from 'react-router-dom';

type props = {
  title: string;
  amount?: number;
  image?: string;
  date?: number;
  groupId?: number;
  groupName?: string;
  onSelect?: void;
  status?: 'debt' | 'credit';
  subtitle?: string;
  membersArray?: Array<FriendDto>;
  customElement?: ReactNode;
};
function dateToString(date: number) {
  return 'Mar 24, 2034';
}

function renderDebtStatusHtml(status: string | undefined) {
  return (
    <div>
      {status === 'credit' ? (
        <span className="">مجموع طلب شما</span>
      ) : (
        <span className="">مجموع بدهی شما</span>
      )}
    </div>
  );
}

export default function GroupCard({
  title,
  amount,
  image,
  groupId,
  groupName,
  status,
  membersArray,
  subtitle,
  customElement,
}: props) {
  const openCreateGroupBottomSheet = (
    event:any,
    groupId: number | undefined,
    groupName: string | undefined,
    membersArray?: any[],
  ) => {
    event?.stopPropagation()
    event?.preventDefault()
    setBottomSheet({
      isOpen: true,
      title: `افزودن عضو به ${groupName}`,
      BottomSheetContent: (
        <CreateGroupBottomSheetContent
          isFindUSerProps={true}
          groupIdProps={groupId}
          groupNameProps={groupName}
          joinedMembersArray={membersArray}
        />
      ),
    });
  };

  const { isOpen, setBottomSheet } = useBottomSheetStore();

  return (
    <Link to={`/group/${groupId}`} className="bg-slate-100 w-full !p-2 rounded-2xl grid grid-cols-1 gap-2" >
      <div className="flex justify-between items-center">
        <div>{amount && <p className="!text-xl !font-bold text-slate-950">{amount}$</p>}</div>
        <p>
          
        </p>
        <BillCardTitle
          title={title}
          image={image || ''}
          dateStr={dateToString(1763968204824)}
        ></BillCardTitle>
      </div>
      <Separator className=" !border-slate-800 !opacity-20" />
      <div className="flex items-center justify-end">
        <div>
          <span></span>
        </div>
        {membersArray && membersArray.length > 0 ? (
          <AvatarGroup>
            <Avatar.Root key={9999} size="md">
              <Button
                onClick={(e) => openCreateGroupBottomSheet(e,groupId, groupName, membersArray)}
                variant={'plain'}
              >
                <Icon icon={addUserIcon} className="scale-200"></Icon>
              </Button>
            </Avatar.Root>
            {membersArray.map((member, index) => (
              <Avatar.Root key={index} size="md">
                <Avatar.Fallback name={member.name} />
                <Avatar.Image src={member.image} />
              </Avatar.Root>
            ))}
          </AvatarGroup>
        ) : (
          <div
            className="text-neutral-800 text-sm w-full flex items-center gap-1 opacity-60"
            onClick={(e) => openCreateGroupBottomSheet(e,groupId, groupName)}
          >
            <span>
              <Icon icon={heartsBoldIcon} width={26} height={26} />
            </span>
            <span className="leading-10 !text-xs ">
              این گروه عضوی ندارد میتوانید از اینجا اعضا را اضافه کنید
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
