'use client';

import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Input,
  Text,
  Box,
  ConditionalValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useBottomSheetStore } from '../../store/slices/bottomSheetStore';

interface BottomSheetProps {
  triggerButtonText?: string;
  title?: string;
  bodyContent?: ReactNode;
  footer?: ReactNode;
  BottomSheetContent?: ReactNode;
  triggerButtonProps?: any;
  size?: ConditionalValue<'sm' | 'md' | 'lg' | 'xl' | 'xs' | 'full' | undefined>;
  isOpen: boolean;
}

const BottomSheet = () => {
  const { isOpen, title, bodyContent, footer, BottomSheetContent, size, setBottomSheet } =
    useBottomSheetStore();

  const DefaultBodyContent = () => (
    <Box>
      <Text>This is a custom component rendered in the bottom sheet!</Text>
    </Box>
  );
  const DefaultFooterContent = () => (
    <Box>
      <Button variant="outline" mr={2} onClick={() => setBottomSheet({ isOpen: false })}>
        انصراف
      </Button>
      <Button colorScheme="blue">ثبت</Button>
    </Box>
  );
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(e) => setBottomSheet({ isOpen: e.open })}
      placement="bottom"
      size={size}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content className="!bg-slate-700" colorPalette={'gray'} color="white">
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <div></div>
            {BottomSheetContent ? (
              <>{BottomSheetContent}</>
            ) : (
              <>
                <Drawer.Body>{bodyContent || BottomSheetContent}</Drawer.Body>
                <Drawer.Footer>{footer || <DefaultFooterContent />}</Drawer.Footer>
              </>
            )}

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" onClick={() => setBottomSheet({ isOpen: false })} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
export default BottomSheet;
