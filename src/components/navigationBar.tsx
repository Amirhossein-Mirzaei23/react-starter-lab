import React, { useState } from 'react';
import { Button } from "@chakra-ui/react"
import { Icon } from '@iconify/react';
// import transActionsIcon from "@iconify-json/solar/icons/add-circle-bold-duotone"
// import addCircle from '@iconify-json/solar/icons/add-circle-bold-duotone';


function NavigationBar() {

    const [index, setindex] = React.useState(0)
    return (
<div className=' flex items-start justify-center h-16 ' >
            <div className='grid grid-cols-5 items-center gap-2 fix bg-gray-700 w-8/12 p-4 rounded-4xl sca' >
            <Button variant="ghost">
             <Icon icon="solar:home-smile-angle-outline" width="32" height="32" />
            </Button>
            <Button variant="ghost">
                 <Icon icon="solar:round-transfer-vertical-outline" width="32" height="32" />
            </Button>
            <Button variant="ghost" className='scale-200 ' >
                 <Icon icon="solar:add-circle-bold" width="32" height="32" className='text-amber-700 scale-125' />
            </Button>
            <Button variant="ghost">
                 <Icon icon="solar:users-group-rounded-outline" width="32" height="32" />
            </Button>
            <Button variant="ghost">
                 <Icon icon="solar:sticker-smile-circle-2-outline" width="32" height="32" />
            </Button>
        </div>
</div>
    );
}

export default NavigationBar;