import { useState, useEffect } from 'react';
import { useUserStore } from '@/app/store';
import { useBottomSheetStore } from '@/app/store';

import { useParams } from 'react-router-dom';
import { useGroupDetail } from '@/hooks/useGroupDetail';
import { Avatar, Button, Progress, Spinner } from '@chakra-ui/react';
import { UpdateGroupDto } from '@/features/groups/api/groups.types';
import { updateGroupApi } from '../../api/groups-services'; 
import { userDto } from '@/types';
import { CreateDebtContent } from '@/features/bills/components/bottom-sheet/createDebt/create-debt-content'; 
import AvatarUploader from '@/features/profile/components/profile/profile-deatail/avatar-uploader'; 
import { updaloerResponse } from '@/services/uploader/uploader.types'; 
import {
  showSnackBarPayload,
  snackbarTypesEnum,
  useSnackBarStore,
} from '@/app/store';
import { Icon } from '@iconify/react';
import addIcon from '@iconify-icons/solar/add-circle-bold';
import { DebtDetailContent } from '@/features/bills/components/bottom-sheet/debtDetail/debt-detail-content';

export default function GroupDetail() {
  const userId = useUserStore()?.getUserInfo()?.id;

  const { id: groupId } = useParams();
  const [creditorId, setCreditorId] = useState();
  const groupIdNum = Number(groupId);
  const { data, isLoading } = useGroupDetail(groupIdNum);
  const { setBottomSheet } = useBottomSheetStore();
  const showSnackbar = useSnackBarStore((s) => s.showSnackbar);
  useEffect(() => {
    if (!data) return;

    setCreditorId(userId as any);
  }, [data]);
  const updateGroupImage = (response: updaloerResponse) => {
    data.group.image = response.fullURL;
    const payload: UpdateGroupDto = {
      name: data.group.name,
      image: data.group.image,
    };
    updateGroupApi(groupIdNum, payload).then(() => {
      const snackBarPaylaod: showSnackBarPayload = {
        description: 'اطلاعات گروه با موفقیت تعییر یافت',
        type: snackbarTypesEnum.success,
      };
      showSnackbar(snackBarPaylaod);
    });
  };

  // const getUniqueBills = (items: any[]) => {
  //   const map = new Map<string, any>();

  //   for (const item of items) {
  //     const key = [item.referenceId].join('|');
  //     if (!map.has(key)) {
  //       map.set(key, item);
  //     }
  //   }

  //   return Array.from(map.values());
  // };

  const getUniqueBills = (items: any[]) => {
    const map = new Map<string, any>();

    for (const item of items) {
      const key = item.referenceId;

      if (!map.has(key)) {
        // clone object to avoid mutating original
        map.set(key, { ...item });
      } else {
        const existing = map.get(key);

        existing.paid += item.paid;
        existing.amount += item.amount;
        // optional: keep amount consistent
        // existing.amount = Math.max(existing.amount, item.amount);

        // optional: recompute isPaid
      }
    }

    return Array.from(map.values());
  };

  const openCreateBillBottomSheet = () => {
    if (creditorId) {
      setBottomSheet({
        isOpen: true,
        title: 'بدهی جدیدی ایجاد کنید.',
        BottomSheetContent: <CreateDebtContent groupIdProps={groupIdNum} creditorId={creditorId} />,
      });
    } else {
    }
  };
  const getBillsDetailData = (referenceId: string) => {
    const filteredItem = data.bills.filter((item: any) => {
      return item.referenceId === referenceId;
    });
    return filteredItem;
  };

  const openDebtDetailBottomSheet = (billReferenceId: any) => {
    console.log(billReferenceId);

    const debtsData = getBillsDetailData(billReferenceId);
    console.log('data', debtsData);

    setBottomSheet({
      isOpen: true,
      title: 'جزییات دیون',
      size: 'xl',
      BottomSheetContent: <DebtDetailContent debtsData={debtsData} group={data?.group} />,
    });
  };

  const getBillProgressColor = (percent: number) => {
    if (percent < 50) return 'red';
    if (percent >= 50 && percent < 75) return 'yellow';
    if (percent >= 75) return 'green';
    return 'blue';
  };

  return (
    <div className="absolute bg-gradient-to-b from-slate-800-300 to-neutral-800 h-full  w-full top-0 right-0">
      <div
        id="header"
        className="flex items-center justify-between !p-3 !border-b !border-neutral-300 bg-[#191C20]"
      >
        <div className="flex items-center justify-start gap-2">
          <div>
            <AvatarUploader
              height={'42px'}
              width={'42px'}
              showEditIcon={false}
              image={data?.group?.image || ''}
              onUploaded={(image) => {
                console.log('Uploaded Image URL:', image);
                updateGroupImage(image); // or save to store
              }}
            />
          </div>

          <h1 className="!text-xl !font-medium">
            {data?.group?.name ? (
              <span>{data.group.name}</span>
            ) : (
              <span>
                <Spinner />
              </span>
            )}
          </h1>
        </div>
      </div>
      <div id="body" className="overflow-auto !h-full relative">
        <div className=" overflow-auto !p-3  w-full flex flex-col gap-2 bg-[#191C20] ">
          <p className="!text-[16px] !font-medium !leading-7">اعضا گروه</p>
          <div className=" w-full flex items-center gap-3 ">
            {data?.members?.map((member: { user: userDto }) => {
                return (
                  <div
                    key={member.user.id}
                    className="flex flex-col items-center justify-center gap-1 !w-20"
                  >
                    <Avatar.Root size="2xl">
                      <Avatar.Fallback name={member.user?.name} />
                      <Avatar.Image src={member?.user?.image} />
                    </Avatar.Root>
                    <p
                      dir="ltr"
                      className="text-xs font-light text-nowrap !truncate !max-w-20 text-center"
                    >
                      {member.user.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="  w-full flex flex-col gap-2 !h-fit">
          {data?.bills?.length ? (
            <>
              <p
                className="!text-[16px] !font-medium !leading-7  sticky
    z-20
    bg-[#191C20]
    !w-full
    !p-1
    backdrop-blur
   -top-1"
              >
                بدهی های ثبت شده
              </p>
              <div className=" w-full flex flex-col items-center gap-3 !mb-32 !p-3">
                {getUniqueBills(data.bills).map((bill: any) => {
                  const paidPercent = (bill.paid / bill.amount) * 100;
                  return (
                    <div
                      key={`${bill.id}`}
                      onClick={() => openDebtDetailBottomSheet(bill.referenceId)}
                      className="flex flex-col w-full relative overflow-hidden justify-items-center !content-center !justify-center  gap-2 !p-7  text-neutral-800 bg-slate-100 !rounded-xl"
                    >
                      <div className="flex w-full !justify-between   ">
                        <p className="text-xs font-light text-nowrap !truncate !max-w-5/12 text-start  !w-full">
                          {bill.title}
                        </p>
                        <p
                          dir="ltr"
                          className="text-xs font-light text-nowrap !truncate !max-w-5/12 text-start  !w-full"
                        >
                          {bill.paid} / {bill.amount}
                        </p>
                      </div>
                      <div className="!w-full absolute -bottom-6 left-0 ">
                        <Progress.Root
                          maxW={'12/12'}
                          min={0}
                          max={100}
                          colorPalette={getBillProgressColor(paidPercent || 2)}
                          className="!w-full"
                          defaultValue={paidPercent || 2}
                        >
                          <Progress.Track>
                            <Progress.Range />
                          </Progress.Track>
                          <Progress.Label />
                          <Progress.ValueText />
                        </Progress.Root>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div>
              {isLoading ? (
                <div className="flex flex-col fixed top-[60%] right-0 gap-32 !w-full  justify-center items-center ">
                  <Spinner size={'xl'} />
                </div>
              ) : (
                <div className="!px-6 flex flex-col fixed top-84 right-0 gap-32 !w-full justify-center items-center ">
                  <img
                    src="/illusteration/404.gif"
                    className="rounded-2xl shadow-lg shadow-neutral-300"
                    alt=""
                  />
                  <Button
                    className="!w-11/12 !h-11 !rounded-xl  !bg-zinc-900  !text-[#fcfcfc] !text-sm !font-semibold"
                    onClick={openCreateBillBottomSheet}
                  >
                    اولین قبض خود را ثبت کنید
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {data?.bills?.length && (
        <div className="!fixed bottom-16 flex items-center justify-end !p-4 !w-full">
          <Button
            className="!fixed bottom-16 !w-[56px] !h-[56px] !p-px !rounded-full !shadow-2xl !bg-gray-200 !border-2 !border-cyan-700"
            onClick={openCreateBillBottomSheet}
          >
            <Icon icon={addIcon} className="!w-[56px] !h-[56px] text-cyan-900" />
          </Button>
        </div>
      )}
    </div>
  );
}
