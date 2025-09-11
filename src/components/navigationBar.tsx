import React, { useState } from 'react';
import { Button } from "@chakra-ui/react"
import { Icon } from '@iconify/react';
// import transActionsIcon from "@iconify-json/solar/icons/add-circle-bold-duotone"
// import addCircle from '@iconify-json/solar/icons/add-circle-bold-duotone';


function NavigationBar() {

    const [index, setindex] = useState(0)

    const handleClick = (index:number) :React.MouseEventHandler<HTMLButtonElement> =>(event) => {
     setindex(index)
    }


    return (
     <div className='flex items-start justify-center h-16'>
    <div className='grid grid-cols-5 items-center gap-2 fix bg-gray-700 w-8/12 p-4 rounded-4xl sca'>
        {[1, 2, 3, 4, 5].map((btnIndex) => (
            <Button
                key={btnIndex}
                onClick={handleClick(btnIndex)}
                variant="ghost"
                
                className={`${index === 1 || index === 5? '!rounded-full' : '' } ${index === btnIndex ? '!bg-slate-800' : ''}`}
            >
          
                {/* Choose icon based on btnIndex */}
                {btnIndex === 1 && <Icon icon="solar:home-smile-angle-outline" width="32" height="32" />}
                {btnIndex === 2 && <Icon icon="solar:round-transfer-vertical-outline" width="32" height="32" />}
                {btnIndex === 3 && <Icon icon="solar:add-circle-bold" width="32" height="32" className='text-amber-700 scale-175' />}
                {btnIndex === 4 && <Icon icon="solar:users-group-rounded-outline" width="32" height="32" />}
                {btnIndex === 5 && <Icon icon="solar:sticker-smile-circle-2-outline" width="32" height="32" />}
            </Button>
        ))}
    </div>
</div>
    );
}

export default NavigationBar;