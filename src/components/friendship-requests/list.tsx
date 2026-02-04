import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FriendCard from '../friends-container/friendCard';
import {
  acceptFriendshipRequestApi,
  friendshipRequestsListApi,
} from '../../api/friends/friends-services';
import { useUserStore } from '../../stores/userStore/userStore';
import { Button } from '@chakra-ui/react';
import { AcceptFriendRequestpayload } from '../../api/friends/friends.types';

export default function FriendshipRequestList() {
  const [listData, setListData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = useUserStore().getUserInfo().id;
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await friendshipRequestsListApi(userId);
      setListData(res);
    } catch (err) {
      console.error(err);
      setError('Failed to load friendship requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [userId]);
  function acceptFriendship(friendshipId: number) {
    const payload: AcceptFriendRequestpayload = {
      friendshipId,
    };
    acceptFriendshipRequestApi(payload)
      .then((res) => {})
      .catch(() => {})
      .finally(() => {
        fetchRequests();
      });
  }
  function AcceptButton() {
    return (
      <div className="flex items-end !w-full">
        <Button className="!bg-green-600 !rounded-xl !text-neutral-100 !w-24">تایید</Button>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-1 flex-col">
      {listData && listData.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 items-center">
          {listData.map((request) => (
            <div onClick={() => acceptFriendship(request.id)}>
              <FriendCard
                key={request.id}
                title={request.user.name}
                subtitle={request.user.phone}
                image={request.user.image}
                customElement={<AcceptButton />}
              />
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
            <p className="text-center !text-lg text-neutral-200 !font-bold">درخواستی یافت نشد؟!</p>
          </div>
        </div>
      )}
    </div>
  );
}
