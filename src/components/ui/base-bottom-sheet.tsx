// src/components/ui/BottomSheet.tsx
"use client";

import { Button, CloseButton, Drawer, Portal, Input, Text, Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useBottomSheetStore } from "../../stores/bottomSheetStore";

// Define props for the BottomSheet component
interface BottomSheetProps {
  triggerButtonText?: string; // Text for the trigger button
  title?: string; // Default title for the bottom sheet
  bodyContent?: ReactNode; // Custom body content
  footer?: ReactNode; // Custom footer content
  triggerButtonProps?: any; // Additional props for the trigger button
}

const BottomSheet = ({
  triggerButtonText = "Open Bottom Sheet",
  title = "Bottom Sheet",
  bodyContent,
  footer,
  triggerButtonProps,
}: BottomSheetProps) => {
  const { isOpen, setBottomSheet } = useBottomSheetStore();

  // Default body content
  const DefaultBodyContent = () => (
    <Box>
      <Text>This is a custom component rendered in the bottom sheet!</Text>
    </Box>
  );

  // Default footer content
  const DefaultFooterContent = () => (
    <Box>
      <Button
        variant="outline"
        mr={2}
        onClick={() => setBottomSheet({ isOpen: false })}
      >
        Discard
      </Button>
      <Button colorScheme="blue">Submit</Button>
    </Box>
  );

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(e) => setBottomSheet({ isOpen: e.open })}
      placement="bottom" // Explicitly set to bottom for bottom sheet behavior
    >

      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="gray.800" color="white">
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{bodyContent || <DefaultBodyContent />}</Drawer.Body>
            <Drawer.Footer>
              {footer || <DefaultFooterContent />}
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton
                size="sm"
                onClick={() => setBottomSheet({ isOpen: false })}
              />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default BottomSheet;