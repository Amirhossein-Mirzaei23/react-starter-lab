import React, { useState } from 'react';
import { Avatar, Button } from "@chakra-ui/react"
import { Icon } from '@iconify/react';
import { useHeaderStore } from '../stores/headerStore/headerStore';
import { useShallow } from 'zustand/react/shallow';

function Header() {
  const { avatar, title, hasSidePageTitle, sidePageTitle, backButton, appIcon } =
    useHeaderStore(
      useShallow((state) => ({
        avatar: state.avatar,
        title: state.title,
        hasSidePageTitle: state.hasSidePageTitle,
        sidePageTitle: state.sidePageTitle,
        backButton: state.backButton,
        appIcon: state.appIcon,
      }),
      
    ));

    return (
        <div className=' flex items-center justify-between px-4 flex-row w-full' >
            {avatar && (
                <div   >
                    <Avatar.Root className='!border-1 !border-slate-100' >
                        <Avatar.Fallback name="Segun Adebayo" />
                        <Avatar.Image src="https://picsum.photos/id/870/536/354" />
                    </Avatar.Root>
                </div>
            )}
            {title &&
                <div>
                    badesaba coffee
                </div>
            }
            {hasSidePageTitle && (
                <div className='flex flex-col gap-1 ' >
                    <h2>Groups</h2>
                    <p>you are in 3 group</p>

                </div>
            )}
            {backButton && (
                <div className='' >

                    <Icon icon="solar:arrow-left-linear" width="24" height="24" />

                </div>
            )}

            {appIcon && (
                <div className='flex items-center gap-1' >
                    <Button variant="ghost">
                        <Icon icon="solar:home-smile-angle-outline" width="32" height="32" />
                    </Button>
                    <p>
                        splity
                    </p>
                </div>)}
        </div>
    );
}

export default Header;


