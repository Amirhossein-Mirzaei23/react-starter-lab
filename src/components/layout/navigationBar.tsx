import React, { useState } from 'react';
import { Box, Button, Field, Input, InputGroup } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import homeSmileIcon from '@iconify-icons/solar/home-smile-angle-outline';
import transferIcon from '@iconify-icons/solar/round-transfer-vertical-outline';
import userGroupIcon from '@iconify-icons/solar/users-group-rounded-outline';
import addCircleIcon from '@iconify-icons/solar/add-circle-bold';
import addUserIcon from '@iconify-icons/solar/user-plus-linear';
import { useBottomSheetStore, useNavigationStore, useUserStore } from '@/app/store';
import BottomSheet from '@/components/ui/base-bottom-sheet';
import { FindFriendBottomSheetContent } from '../../features/friends/components/bottom-sheet/addFriend/find-friend-content';
import { useNavigate } from 'react-router-dom';
import { CreateGroupBottomSheetContent } from '../../features/groups/components/bottom-sheet/createGroups/create-group-content';

function NavigationBar() {
  const { isNavVisible } = useNavigationStore();
  const navigate = useNavigate();
  const openFindFriendBottomSheet = () => {
    if (!token) {
      navigate('/sign-in');
      return;
    }
    setBottomSheet({
      isOpen: true,
      title: 'دوستان خود را پیدا کنید.  ',
      BottomSheetContent: <FindFriendBottomSheetContent />,
    });
  };

  const openCreateGroupBottomSheet = () => {
    if (!token) {
      navigate('/sign-in');
      return;
    }
    setBottomSheet({
      isOpen: true,
      title: 'گروه خود را ایجاد کنید.  ',
      BottomSheetContent: <CreateGroupBottomSheetContent />,
    });
  };

  const { isOpen, title, bodyContent, footer, setBottomSheet } = useBottomSheetStore();
  const token = useUserStore((s) => s.getToken());
  return (
    <>
      <Box p={4}>
        <BottomSheet />
      </Box>
      {isNavVisible && (
        <div id="navigation-bar" className="flex items-start justify-center">
          <nav className="grid grid-cols-5 items-center  fixed bg-slate-600 bottom-0  w-full">
            <div
              onClick={() => navigate('/')}
              className="mx-auto  flex items-center justify-center !p-3 !bg-slate-800"
            >
              <Icon icon={homeSmileIcon} width="24" height="24" />
            </div>
            <div
              onClick={() => navigate('/profile/friendship-requests')}
              className="mx-auto  flex items-center justify-center !p-3 !bg-slate-800"
            >
              <Icon icon={transferIcon} width="24" height="24" />
            </div>

            <div
              onClick={() => openFindFriendBottomSheet()}
              className="mx-auto  flex items-center justify-center !p-3 !bg-slate-800"
            >
              <Icon icon={addUserIcon} width="24" height="24" />
            </div>
            <div
              onClick={() => navigate('/groups')}
              className="mx-auto  flex items-center justify-center !p-3 !bg-slate-800"
            >
              <Icon icon={userGroupIcon} width="24" height="24" />
            </div>
            <div className="mx-auto  flex items-center justify-center !p-3 !bg-slate-800">-</div>
          </nav>
        </div>
      )}
    </>
  );
}

export default NavigationBar;
