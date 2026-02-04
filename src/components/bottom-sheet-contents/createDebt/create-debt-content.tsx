import { Button, CenterProps, Drawer, Field } from '@chakra-ui/react';
import { useBottomSheetStore } from '../../../stores/bottomSheetStore';
import React, { useState } from 'react';
import FloatingLabelInput from '../../ui/floating-label-input';
import { userDto } from '../../../types';
import FriendCard from '../../friends-container/friendCard';
import { useUserStore } from '../../../stores/userStore/userStore';
import {
  showSnackBarPayload,
  snackbarTypesEnum,
  useSnackBarStore,
} from '../../../stores/snackbarStore/snackBarStore';
import {
  findUserApi,
  friendsListApi,
  sendFriendshipRequestApi,
} from '../../../api/friends/friends-services';
import { FindUserPayload } from '../../../api/friends/friends.types';
import {
  addFriendToGroupApi,
  createBillForGroupMembers,
  createGroupApi,
} from '../../../api/groups/groups-services';
import { createBillPayload, CreateGroupDto } from '../../../api/groups/groups.types';
import { useUserGroupsList } from '../../../hooks/useGroupsList';
import { useGroupDetail } from '../../../hooks/useGroupDetail';

type props = {
  groupIdProps?: number;
  creditorId: number;
};
function dateToString(date: number) {
  return 'Mar 24, 2034';
}

export function CreateDebtContent({ groupIdProps, creditorId }: props) {
  const [debtName, setdebtName] = useState<string>('');
  const [debtAmount, setDebtAmount] = useState<string>();
  const [groupId, setGroupId] = useState<number | undefined>(groupIdProps);
  const [debtNameError, setdebtNameError] = useState('');
  const userId = useUserStore().getUserInfo().id;

  const phoneRegex = /^09\d{9}$/;
  const { isOpen, setBottomSheet } = useBottomSheetStore();
  const [createBillLoading, setCreateBillLoading] = useState<boolean>(false);
  const showSnackbar = useSnackBarStore((s) => s.showSnackbar);

  const { refetch } = useGroupDetail(groupIdProps || 0);
  async function submit() {
    if (groupIdProps) {
      createBillApi(groupIdProps);
    } else {
      closeBottomSheet();
    }
  }
  function createBillApi(groupId: number) {
    setCreateBillLoading(true);
    if (!debtAmount) {
      return;
    }
    if (!debtName) {
      return;
    }

    const payload: createBillPayload = {
      creditorId: creditorId,
      title: debtName,
      amount: Number(debtAmount),
    };
    createBillForGroupMembers(groupId, payload)
      .then(() => {
        refetch();
        closeBottomSheet();
      })
      .catch((error: any) => {
        console.error(error);
      })
      .finally(() => {
        setCreateBillLoading(false);
      });
  }

  function closeBottomSheet() {
    setBottomSheet({ isOpen: false });
  }

  return (
    <>
      <Drawer.Body>
        <div className="grid grid-cols-1 items-center justify-center gap-4">
          <Field.Root required invalid={debtNameError.length > 0} className="">
            <FloatingLabelInput
              label="عنوان را وارد کنید"
              size="md"
              labelBgColor="#314158"
              value={debtName}
              onChange={(e) => setdebtName(e.currentTarget.value)}
              minLength={1}
              shadow={'none'}
            />
            {/* <Field.ErrorText className='absolute bottom-0 translate-y-5'  >{phoneError}</Field.ErrorText> */}
          </Field.Root>
          <Field.Root required invalid={debtNameError.length > 0} className="">
            <FloatingLabelInput
              label="مقدار را وارد کنید."
              size="md"
              type="number"
              labelBgColor="#314158"
              value={debtAmount}
              onChange={(e) => setDebtAmount(e.currentTarget.value)}
              minLength={1}
              shadow={'none'}
            />
            {/* <Field.ErrorText className='absolute bottom-0 translate-y-5'  >{phoneError}</Field.ErrorText> */}
          </Field.Root>
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
            loading={createBillLoading}
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
