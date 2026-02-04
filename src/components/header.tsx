import { useCallback, useMemo } from 'react';
import { Avatar, Button } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import noLoginIcon from '@iconify-icons/solar/user-heart-rounded-outline';
import homeIcon from '@iconify-icons/solar/home-smile-angle-outline';
import arrowLeftOutline from '@iconify-icons/solar/arrow-left-outline';
import { useHeaderStore } from '../stores/headerStore/headerStore';
import { useShallow } from 'zustand/react/shallow';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useUserStore } from '../stores/userStore/userStore';

function Header() {
  const headerState = useHeaderStore(
    useShallow((state) => ({
      avatar: state.avatar,
      title: state.title,
      backButton: state.backButton,
      appIcon: state.appIcon,
      isSticky: state.isSticky,
      hasBackground: state.hasBackground,
    })),
  );

  const { avatar, title, backButton, appIcon, hasBackground, isSticky } = headerState;

  // Memoize computed styles
  const styles = useMemo(
    () => ({
      background: hasBackground ? 'bg-[#111925]' : '',
      position: isSticky ? 'fixed' : '',
    }),
    [hasBackground, isSticky],
  );

  const navigate = useNavigate();
  const location = useLocation();

  const routerBack = useCallback(() => {
    if (window.history.length <= 1 || location.pathname === '/sign-in') {
      navigate('/');
    } else {
      navigate(-1);
    }
  }, [navigate, location.pathname]);

  const userAuth = useUserStore(
    useShallow((state) => ({
      token: state.getToken(),
      userInfo: state.getUserInfo(),
      isAuthenticated: state.isAuthenticated(),
    })),
  );

  return (
    <div className="h-14">
      <div
        className={`items-center grid grid-cols-3 position top-0 right-0 !py-3 !px-4 w-full z-50 ${styles.background} ${styles.position}`}
      >
        {/* bg-gray-950 */}
        <div>
          {avatar && userAuth.token && (
            <div className="">
              <Link to="/profile">
                <Avatar.Root className="!border-1 !border-slate-100 !bg-slate-800" bg="#5F7087">
                  <Avatar.Fallback name={userAuth?.userInfo?.name} />
                  <Avatar.Image src={userAuth?.userInfo?.image} />
                </Avatar.Root>
              </Link>
            </div>
          )}
          {avatar && !userAuth.token && (
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
        <div className="z-50">
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
