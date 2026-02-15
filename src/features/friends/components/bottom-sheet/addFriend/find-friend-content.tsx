import { Button, Drawer, Field } from '@chakra-ui/react';
import { useBottomSheetStore, useUserStore, useSnackBarStore, showSnackBarPayload, snackbarTypesEnum } from '@/app/store';
import React, { useState } from 'react';
import FloatingLabelInput from '@/components/ui/floating-label-input';
import { userDto } from '@/types';
import FriendCard from '../../friendCard';
import { findUserApi, sendFriendshipRequestApi } from '../../../api/friends-services';
import { FindUserPayload } from '../../../api/friends.types';
import { useFindUser } from '../../../../../hooks/useFindUser';

export function FindFriendBottomSheetContent() {
  const [phone, setPhone] = useState<string>('');
  const [friendData, setFriendData] = useState<userDto>();
  const [isFindUSer, seFindUSer] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState('');
  const userId = useUserStore().getUserInfo().id;

  const phoneRegex = /^09\d{9}$/;
  const { isOpen, setBottomSheet } = useBottomSheetStore();
  const showSnackbar = useSnackBarStore((s) => s.showSnackbar);
  function checPhoneValidation(val: string | undefined) {
    const phone = val;
    let hasError = false;
    setPhoneError('');

    if (!phone?.toString() || phone?.toString().length < 1) {
      console.log('state');

      setPhoneError('لطفا شماره همراه خود را وارد نمایید.');
    } else if (!phoneRegex.test(phone)) {
      console.log('state2');
      setPhoneError('شماره همراه وارد شده صحیح نیست.');
      hasError = true;
    }
    return hasError;
  }
  function sendFriendshipRequest(friendId: number) {
    const payload = {
      senderId: userId,
      receiverId: friendId,
    };

    sendFriendshipRequestApi(payload)
      .then((res) => {
        console.log(res);
        closeBottomSheet();
        const snackBarPayload: showSnackBarPayload = {
          type: snackbarTypesEnum.success,
          description: 'درخواست با موفقیت ارسال شد',
        };
        showSnackbar(snackBarPayload);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function submit() {
    if (!isFindUSer && friendData) {
      sendFriendshipRequest(friendData.id);
    }
    if (checPhoneValidation(phone)) {
      return;
    }
    await findUser(phone);
    closeBottomSheet();
    setTimeout(() => {
      setBottomSheet({ isOpen: true, size: 'xl' });
    }, 100);
  }

  React.useEffect(() => {
    if (friendData) {
      const isValidPhone = !checPhoneValidation(phone);
      if (isValidPhone) {
        findUser(phone);
      }
    }
  }, [phone]);

  async function findUser(phone: string) {
    try {
      const { data, isLoading, error, refetch } = useFindUser(phone);
      const res = data;
      console.log(res);

      setFriendData(res?.data);
    } catch (err) {
      console.log('got err', err);
    }
  }
  function closeBottomSheet() {
    setBottomSheet({ isOpen: false });
  }
  return (
    <>
      <Drawer.Body>
        <div className="grid grid-cols-1 items-center justify-center gap-4">
          <div>
            <Field.Root required invalid={phoneError.length > 0} className="">
              <FloatingLabelInput
                label="شماره تماس"
                size="md"
                labelBgColor="#314158"
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
                type="number"
                minLength={11}
                shadow={'none'}
                maxLength={11}
              />
              {/* <Field.ErrorText className='absolute bottom-0 translate-y-5'  >{phoneError}</Field.ErrorText> */}
            </Field.Root>
          </div>

          {friendData && (
            <div className="w-full" onClick={() => sendFriendshipRequest(friendData.id)}>
              <FriendCard title={friendData.name} image={friendData.image} />
            </div>
          )}
        </div>
      </Drawer.Body>
      <Drawer.Footer>
        <div className="flex items-center gap-1">
          <Button
            variant="plain"
            className="w-20 !text-[16px] !text-neutral-100 !font-medium"
            onClick={closeBottomSheet}
          >
            انصراف
          </Button>
          <Button
            colorScheme="blue"
            className="w-20 !text-[16px] !text-neutral-800 !font-medium !rounded-md"
            onClick={submit}
          >
            تایید
          </Button>
        </div>
      </Drawer.Footer>
    </>
  );
}
