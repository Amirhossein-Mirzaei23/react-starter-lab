import React, { useState } from 'react';
import { Avatar, Button } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import noLoginIcon from '@iconify-icons/solar/user-heart-rounded-outline';
import homeIcon from '@iconify-icons/solar/home-smile-angle-outline';
import arrowLeftOutline from '@iconify-icons/solar/arrow-left-outline';
import { useHeaderStore } from '../stores/headerStore/headerStore';
import { useShallow } from 'zustand/react/shallow';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBottomSheetStore } from '../stores/bottomSheetStore';
import {
  LoginBottomSheetBodyContent,
  LoginBottomSheetFooterContent,
} from './bottom-sheet-contents/login-content';
import { useUserStore } from '../stores/userStore/userStore';

function Header() {
  const { avatar, title, backButton, appIcon, hasBackground, isSticky } = useHeaderStore(
    useShallow((state) => ({
      avatar: state.avatar,
      title: state.title,
      backButton: state.backButton,
      appIcon: state.appIcon,
      isSticky: state.isSticky,
      hasBackground: state.hasBackground,
    })),
  );

  // decide background
  const backgroundStyle = hasBackground ? 'bg-[#111925]' : ''; // empty → custom color via inline style

  const positionStyle = isSticky ? 'fixed' : ''; // empty → custom color via inline style

  const navigate = useNavigate();
  const location = useLocation();

const routerBack = () => {

console.log(location);

  if (window.history.length <= 1 || location.pathname === '/sign-in') {
    navigate('/');
  } else {
    navigate(-1);
  }
};

  const token = useUserStore((s) => s.getToken());
  const userInfo = useUserStore((s) => s.getUserInfo());

  return (
    <div className="h-14">
      <div
        className={`items-center grid grid-cols-3 position  top-0 right-0 !py-3 !px-4 w-full   z-50 ${backgroundStyle} ${positionStyle}`}
      >
        {/* bg-gray-950 */}
        <div>
          {avatar && token && (
            <div className="">
              <Link to="/profile">
                <Avatar.Root className="!border-1 !border-slate-100 !bg-slate-800" bg="#5F7087">
                  <Avatar.Fallback name={userInfo.name} />
                  <Avatar.Image src={userInfo.image} />
                </Avatar.Root>
              </Link>
            </div>
          )}
          {avatar && !token && (
            <Link to="/sign-in">
              <Button variant="surface">
                <Icon icon={noLoginIcon} width="24" height="24" className="text-neutral-200" />
                <span>login</span>
              </Button>
            </Link>
          )}
        </div>
        <div className="flex justify-center items-center text-nowrap">
          {title && <div>{title}</div>}
        </div>
        <div className='z-50' >
          {backButton && (
            <div onClick={routerBack} className="flex justify-end items-center z-50 ">
              <Icon icon={arrowLeftOutline} width="24" height="24" />
            </div>
          )}
          {!backButton && appIcon && (
            <div className="flex items-center justify-end  gap-1">
              <Icon icon={homeIcon} width="24" height="24" />
              <p>splity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
