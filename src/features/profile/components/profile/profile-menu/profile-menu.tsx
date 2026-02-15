import { Icon, IconifyIcon } from '@iconify/react';
import userHeartIcon from '@iconify-icons/solar/user-heart-rounded-outline';
import usersGroupICon from '@iconify-icons/solar/users-group-rounded-outline';
import logOutIcon from '@iconify-icons/solar/shield-warning-outline';
import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';

export default function ProfileMenuList() {
  interface menuItem {
    id: number;
    title: string;
    icon: IconifyIcon;
    link: string;
  }

  const menuItems: menuItem[] = [
    {
      id: 1,
      title: 'اطلاعات حساب کاربری',
      icon: userHeartIcon,
      link: '/profile/detail',
    },
    {
      id: 2,
      title: 'دوستان شما',
      icon: usersGroupICon,
      link: '/profile/friend',
    },
    {
      id: 2,
      title: 'لیست درخواست ها',
      icon: usersGroupICon,
      link: '/profile/friendship-requests',
    },
    {
      id: 3,
      title: 'خروج از حساب',
      icon: logOutIcon,
      link: '/profile/logout',
    },
  ];

  return (
    <div>
      <ul className="grid grid-cols-1 gap-2 items-center">
        {menuItems.map((item) => (
          <li key={item.id} className="bg-neutral-200 !p-3 rounded-xl">
            <Link to={item.link} className="f">
              <div className="flex items-center gap-1 p-3 rounded-xl !text-neutral-800 hover:!text-neutral-600">
                <Avatar.Root size={'xl'} bg="#5F7087">
                  <Icon icon={item.icon} className="!text-2xl " />
                </Avatar.Root>
                <span className="text-lg">{item.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* <Link to="/friends-list">
          <Icon className="!text-2xl" icon={forwardLeftIcon} />
        </Link> */}
    </div>
  );
}
