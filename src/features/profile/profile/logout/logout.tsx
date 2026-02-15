import { Link, useNavigate } from 'react-router-dom';
import { useHeaderStore, useNavigationStore } from '@/app/store';
import React from 'react';
import { Button } from '@chakra-ui/react';
import useAuth from '@/hooks/useAuth';
import styles from './logout.module.css';

export default function ProfileLogOutPage() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const toggleBackButton = useHeaderStore((s) => s.toggleBackButton);
  const sethasBackground = useHeaderStore((s) => s.sethasBackground);
  const setAvatar = useHeaderStore((s) => s.hasAvatar);
  const showNavBar = useNavigationStore((s) => s.showNav);
  React.useEffect(() => {
    setTitle('');
    toggleBackButton(false);
    sethasBackground(false);
    setAvatar(true);
    showNavBar();
  }, []);
  const { removeAuthData } = useAuth();
  const navigate = useNavigate();
  const logOut = () => {
    removeAuthData();
    navigate('/');
  };

  return (
    <div className="flex flex-col flex-1 gap-8 justify-between">
      <div className={styles.illustarion}>
        <img
          src="/illusteration/logout1.gif"
          className="rounded-2xl !w-full scale-125 !mt-16 !mr-24 shadow-neutral-300"
          alt=""
        />
      </div>
      <div className=" rounded-lg !p-4  flex flex-col gap-6 !border !border-slate-600 bg-[#1d293d40] !mt-3">
        <p className="!text-[16px] !font-medium leading-8">آیا میخواهید از حساب خود خارج شوید؟</p>
        <div className="flex items-center gap-1 justify-end">
          <Button
            variant="plain"
            className="!w-16 !text-sm !text-neutral-100 !font-medium"
            onClick={() => navigate(-1)}
          >
            انصراف
          </Button>
          <Button
            colorScheme="blue"
            bg="#4C8DFF"
            className="!w-24  !text-sm !text-neutral-800 !font-medium !rounded-md"
            onClick={logOut}
          >
            تایید
          </Button>
        </div>
      </div>
    </div>
  );
}
