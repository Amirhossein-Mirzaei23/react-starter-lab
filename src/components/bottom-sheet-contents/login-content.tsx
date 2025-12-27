import { Button, Field, Input, InputGroup } from '@chakra-ui/react';
import { useBottomSheetStore } from '../../stores/bottomSheetStore';

export function LoginBottomSheetBodyContent() {
  return (
    <div className="grid grid-cols-1 items-center justify-center">
      <div></div>
      <div>
        <Field.Root required>
          <Field.Label>
            <Field.RequiredIndicator />
            <p>شماره تلفن</p>
          </Field.Label>
          <InputGroup>
            <Input size="md" placeholder="مبلغ بدهی رو وارد کنید" mb={4} />
          </InputGroup>
          <Field.ErrorText>This field is required</Field.ErrorText>
        </Field.Root>
        <Button variant={'plain'}>اکانت ندارید ثبت نام کنید.</Button>
      </div>
    </div>
  );
}

export function LoginBottomSheetFooterContent() {
  const { isOpen, setBottomSheet } = useBottomSheetStore();

  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" onClick={() => setBottomSheet({ isOpen: false })}>
        انصراف
      </Button>
      <Button colorScheme="blue">ورود</Button>
    </div>
  );
}
