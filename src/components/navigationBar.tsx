import React, { useState } from 'react';
import { Button, Field, Input, InputGroup } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useBottomSheetStore } from '../stores/bottomSheetStore';
// import transActionsIcon from "@iconify-json/solar/icons/add-circle-bold-duotone"
// import addCircle from '@iconify-json/solar/icons/add-circle-bold-duotone';

const BottomSheetBodyContent = () => (
  <div className="grid grid-cols-1 items-center justify-center">
    <div></div>
    <div>
      <Field.Root required>
        <Field.Label>
          Amount <Field.RequiredIndicator />
        </Field.Label>
         <InputGroup startElement="$" endElement="USD">
          <Input size="md" placeholder="Enter debt value" mb={4} />
         </InputGroup>
        <Field.ErrorText>This field is required</Field.ErrorText>
      </Field.Root>
    </div>
  </div>
);






function NavigationBar() {
  const [index, setindex] = useState(0);

// Default footer content
const DefaultFooterContent = () => (
  <div className="flex items-center gap-1">
    <Button variant="outline" onClick={() => setBottomSheet({ isOpen: false })}>
      Discard
    </Button>
    <Button colorScheme="blue">Submit</Button>
  </div>
);

const openBottomSheet = () => {
  setBottomSheet({
    isOpen: true,
    title: 'login test',
    bodyContent:<BottomSheetBodyContent />,
    footer:<DefaultFooterContent />
  });
};


const { isOpen, setBottomSheet } = useBottomSheetStore();
  const handleClick =
    (index: number): React.MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      setindex(index);
      if (index == 3 )  {
        openBottomSheet()
      }
    };

  return (
    <div className="flex items-start justify-center h-16">
      <div className="grid grid-cols-5 items-center gap-2 fix bg-gray-700 w-8/12 p-4 rounded-4xl sca">
        {[1, 2, 3, 4, 5].map((btnIndex) => (
          <Button
            key={btnIndex}
            onClick={handleClick(btnIndex)}
            variant="ghost"
            className={`${index === 1 || index === 5 ? '!rounded-full' : ''} ${index === btnIndex ? '!bg-slate-800' : ''}`}
          >
            {/* Choose icon based on btnIndex */}
            {btnIndex === 1 && (
              <Icon icon="solar:home-smile-angle-outline" width="32" height="32" />
            )}
            {btnIndex === 2 && (
              <Icon icon="solar:round-transfer-vertical-outline" width="32" height="32" />
            )}
            {btnIndex === 3 && (
              <Icon
                icon="solar:add-circle-bold"
                width="32"
                height="32"
                className="text-amber-700 scale-175"
              />
            )}
            {btnIndex === 4 && (
              <Icon icon="solar:users-group-rounded-outline" width="32" height="32" />
            )}
            {btnIndex === 5 && (
              <Icon icon="solar:sticker-smile-circle-2-outline" width="32" height="32" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default NavigationBar;
