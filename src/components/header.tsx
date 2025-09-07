import React, { useState } from 'react';
import { Avatar, Button } from "@chakra-ui/react"
import { Icon } from '@iconify/react';
import { useHeaderStore } from '../stores/headerStore/headerStore';


function Header() {

    const visibleSections = useHeaderStore((state) => state.visibleSections);
    return (
        <div className=' flex items-center justify-between px-4 flex-row-reverse w-full' >
            {visibleSections.avatar && (
                <div   >
                    <Avatar.Root className='!border-1 !border-slate-100' >
                        <Avatar.Fallback name="Segun Adebayo" />
                        <Avatar.Image src="https://picsum.photos/id/870/536/354" />
                    </Avatar.Root>
                </div>
            )}
            {visibleSections.title &&
                <div>
                    badesaba coffee
                </div>
            }
            {visibleSections.hasSidePageTitle && (
                <div className='flex flex-col gap-1 ' >
                    <h2>Groups</h2>
                    <p>you are in 3 group</p>

                </div>
            )}
            {visibleSections.backButton && (
                <div className='' >

                    <Icon icon="solar:arrow-left-linear" width="24" height="24" />

                </div>
            )}

            {visibleSections.appIcon && (
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


