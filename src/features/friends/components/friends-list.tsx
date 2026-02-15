import FriendCard from './friendCard';
import { useHeaderStore } from '@/app/store';
import React, { useEffect, useState } from 'react';
import { friendsListApi } from '../api/friends-services';
import { useUserStore } from '@/app/store';
import { Button, Spinner } from '@chakra-ui/react';
import { FindFriendBottomSheetContent } from './bottom-sheet/addFriend/find-friend-content';
import { useBottomSheetStore } from '@/app/store';
export default function FriendsList() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const toggleBackButton = useHeaderStore((s) => s.toggleBackButton);
  const sethasBackground = useHeaderStore((s) => s.sethasBackground);
  const setAvatar = useHeaderStore((s) => s.hasAvatar);
  const setStickyPostion = useHeaderStore((s) => s.setStickyPostion);
  React.useEffect(() => {
    setTitle('دوستان شما');
    setAvatar(false);
    toggleBackButton(true);
    sethasBackground(true);
    setStickyPostion(true);
    fetchRequests();
  }, []);

  const [friendsList, setFriendsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = useUserStore().getUserInfo().id;
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await friendsListApi(userId);
      setFriendsList(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load friendship requests');
    } finally {
      setLoading(false);
    }
  };

  const openFindFriendBottomSheet = () => {
    setBottomSheet({
      isOpen: true,
      title: 'دوستان خود را پیدا کنید.  ',
      BottomSheetContent: <FindFriendBottomSheetContent />,
    });
  };

  const { isOpen, title, bodyContent, footer, setBottomSheet } = useBottomSheetStore();

  return (
    <div className="flex-1 flex  flex-col">
      {loading ? (
        <div className="flex-1 flex  flex-col justify-center items-center">
          <Spinner size="lg" borderWidth="2px" />
        </div>
      ) : (
        <>
          {friendsList && friendsList.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 items-center">
              {friendsList.map((friend) => (
                <div onClick={() => console.log('click')}>
                  <FriendCard
                    title={friend.friendInfo.name}
                    amount={friend.net}
                    image={friend.friendInfo.image}
                    status={friend.owesYou - friend.youOwe > 0 ? 'credit' : 'debt'}
                  ></FriendCard>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col  flex-1 justify-evenly ">
              <img
                src="/illusteration/404.gif"
                className="rounded-2xl shadow-lg shadow-neutral-300"
                alt=""
              />
              <div className="flex flex-col gap-4 items-center justify-center">
                <p className="text-center !text-lg text-neutral-200 !font-bold">
                  ما دوستان شما را پیدانکردیم! لطفا با زدن بر روی دکمه زیر دوستان خود اضافه کنید.
                </p>
                <Button className="w-8/12 mx-auto" onClick={openFindFriendBottomSheet}>
                  افزودن دوستان
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
