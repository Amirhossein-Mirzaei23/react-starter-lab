import { Button, Drawer, Field } from '@chakra-ui/react';
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
import { addFriendToGroupApi, createGroupApi } from '../../../api/groups/groups-services';
import { CreateGroupDto } from '../../../api/groups/groups.types';
import { useUserGroupsList } from '../../../hooks/useGroupsList';

type props = {
  isFindUSerProps?: boolean;
  groupIdProps?: number;
  groupNameProps?: string;
  joinedMembersArray?: any[];
};
function dateToString(date: number) {
  return 'Mar 24, 2034';
}

export function CreateGroupBottomSheetContent({
  groupIdProps,
  isFindUSerProps,
  groupNameProps,
  joinedMembersArray,
}: props) {
  const [groupName, setGroupName] = useState<string>(groupNameProps || '');
  const [groupId, setGroupId] = useState<number | undefined>(groupIdProps);
  const [friendsData, setFriendsData] = useState<Array<any>>();
  const [friendIds, setFriendIds] = useState<Array<number>>([]);
  const [isFindUSer, seFindUSer] = useState<boolean>(isFindUSerProps || false);
  const [groupNameError, setGroupNameError] = useState('');
  const userId = useUserStore().getUserInfo().id;

  const phoneRegex = /^09\d{9}$/;
  const { isOpen, setBottomSheet } = useBottomSheetStore();
  const showSnackbar = useSnackBarStore((s) => s.showSnackbar);
  const { refetch } = useUserGroupsList({ userId, page: 1, limit: 100 });
  React.useEffect(() => {
    if (isFindUSer) {
      getFriendsList();
    }
  }, [isFindUSer]);

  function checkNameValidation(val: string | undefined) {
    const phone = val;
    let hasError = false;
    setGroupNameError('');

    if (!phone?.toString() || phone?.toString().length < 1) {
      setGroupNameError('لطفا شماره همراه خود را وارد نمایید.');
    } else if (!phoneRegex.test(phone)) {
      setGroupNameError('شماره همراه وارد شده صحیح نیست.');
      hasError = true;
    }
    return hasError;
  }
  async function submit() {
    if (!isFindUSer) {
      createGroup();
    } else {
      sendAddToGroupRequest(friendIds);
    }
  }
  function createGroup() {
    const payload: CreateGroupDto = {
      name: groupName,
      ownerId: userId,
    };
    createGroupApi(payload)
      .then((res) => {
        setGroupId(res.id);
        setBottomSheet({ isOpen: false });
        seFindUSer(true);
        getFriendsList();
        setTimeout(() => {
          setBottomSheet({ isOpen: true, size: 'full', title: `اعضای ${groupName}` });
        }, 20);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getFriendsList() {
    friendsListApi(userId)
      .then((res) => {
        if (joinedMembersArray) {
          const joinedIds = new Set(joinedMembersArray.map((f) => f.id));
          res.data = res.data.filter((friend: any) => !joinedIds.has(friend.friendInfo.id));
        }
        setFriendsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const toggleSelect = (id: number) => {
    setFriendIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    console.log(friendIds);
  };

  function closeBottomSheet() {
    setBottomSheet({ isOpen: false });
  }
  function sendAddToGroupRequest(friendIds: Array<number>) {
    const payload = {
      ownerId: Number(userId),
      friendIds,
    };
    addFriendToGroupApi(Number(groupId), payload).then((res) => {
      if (groupIdProps) {
        refetch();
      }
      setBottomSheet({ isOpen: false });
    });
  }
  return (
    <>
      <Drawer.Body>
        {!isFindUSer && (
          <div className="grid grid-cols-1 items-center justify-center gap-4">
            <div>
              <Field.Root required invalid={groupNameError.length > 0} className="">
                <FloatingLabelInput
                  label="نام گروه را وارد کنید"
                  size="md"
                  labelBgColor="#314158"
                  value={groupName}
                  onChange={(e) => setGroupName(e.currentTarget.value)}
                  minLength={1}
                  shadow={'none'}
                />
                {/* <Field.ErrorText className='absolute bottom-0 translate-y-5'  >{phoneError}</Field.ErrorText> */}
              </Field.Root>
            </div>
          </div>
        )}
        {isFindUSer && (
          <>
            {friendsData && friendsData.length > 0 ? (
              <div className="!mt-4 grid grid-cols-1 gap-3">
                {friendsData.map((friend) => {
                  const id = friend.friendInfo.id;
                  const isSelected = friendIds.includes(id);

                  return (
                    <div
                      key={id}
                      onClick={() => toggleSelect(id)}
                      className={`cursor-pointer transition-all ${
                        isSelected ? 'opacity-65' : 'opacity-100'
                      }`}
                    >
                      <FriendCard
                        title={friend.friendInfo.name}
                        subtitle={friend.friendInfo.phone}
                        image={friend.friendInfo.image}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <p className="!text-[16px] !font-medium leading-7">
                  تمام دوستان شما در این گروه عضو شده اند.
                </p>
              </div>
            )}
          </>
        )}
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
