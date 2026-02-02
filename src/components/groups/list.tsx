import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FriendCard from '../friends-container/friendCard';
import {
  acceptFriendshipRequestApi,
  friendshipRequestsListApi,
} from '../../api/friends/friends-services';
import { useUserStore } from '../../stores/userStore/userStore';
import { Button, Spinner } from '@chakra-ui/react';
import { AcceptFriendRequestpayload } from '../../api/friends/friends.types';
import GroupCard from './card';
import { getUserGroupsApi } from '../../api/groups/groups-services';
import { UserGroupListPayload } from '../../api/groups/groups.types';
import { CreateGroupBottomSheetContent } from '../bottom-sheet-contents/createGroups/create-group-content';
import { useBottomSheetStore } from '../../stores/bottomSheetStore';
import { useUserGroupsList } from '../../hooks/useGroupsList';
import addIcon from "@iconify-icons/solar/add-circle-bold"
import { Icon } from '@iconify/react';


export default function GroupsList() {
  const userId = useUserStore().getUserInfo().id;
  const { data, isLoading, error, refetch } = useUserGroupsList({ userId, page: 1, limit: 100 });

  const { isOpen, setBottomSheet } = useBottomSheetStore();

  const openCreateGroupBottomSheet = () => {
    event?.stopPropagation()
    setBottomSheet({
      isOpen: true,
      title: `گروه خود را ایجاد کنید`,
      BottomSheetContent: <CreateGroupBottomSheetContent />,
    });
  };


  if (isLoading)
    return (
      <div className="flex-1 flex  flex-col justify-center items-center">
        <Spinner size="lg" borderWidth="2px" />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-1 flex-col">
      {data.data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 items-center !mb-6">
          {data.data.map((group: any) => (
            <div key={group.id}>
              <GroupCard
                key={group.id}
                groupId={group.id}
                groupName={group.name}
                title={group.name}
                image={group.image}
                membersArray={group.membersArray}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col  flex-1 justify-evenly ">
          <img
            src="/illusteration/404.gif"
            className="rounded-2xl shadow-lg shadow-neutral-300"
            alt=""
          />
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-center !text-lg text-neutral-200 !font-bold">
              شما هنوز گروهی ایجاد نکرده اید
            </p>
            <Button className="w-8/12 mx-auto" onClick={openCreateGroupBottomSheet}>
              افزودن گروه
            </Button>
          </div>
        </div>
      )}

            <div className="!fixed bottom-16 flex items-center justify-end !p-4 !w-full !px-6">
        <Button
          className="!fixed bottom-16 !w-[56px] !h-[56px] !p-1 !rounded-full !shadow-2xl !bg-gray-200 !border-2 !border-cyan-700"
          onClick={openCreateGroupBottomSheet}
        >

            <Icon icon={addIcon} className='!w-[56px] !h-[56px] !text-cyan-700' />
         
        </Button>
      </div>
    </div>
  );
}
