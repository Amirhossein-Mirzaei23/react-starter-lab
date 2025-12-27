import { useState, useEffect } from 'react';
import { useUserStore } from '../../../stores/userStore/userStore';
import { CreateGroupBottomSheetContent } from '../../bottom-sheet-contents/createGroups/create-group-content';
import { useBottomSheetStore } from '../../../stores/bottomSheetStore';

import { useParams } from 'react-router-dom';
import { useGroupDetail } from '../../../hooks/useGroupDetail';
import { Avatar, Button, Progress, Spinner } from '@chakra-ui/react';
import { createBillPayload, UpdateGroupDto } from '../../../api/groups/groups.types';
import { createBillForGroupMembers, updateGroupApi } from '../../../api/groups/groups-services';
import { userDto } from '../../../types';
import { CreateDebtContent } from '../../bottom-sheet-contents/createDebt/create-debt-content';
import AvatarUploader from '../../profile/profile-deatail/avatar-uploader';
import { updaloerResponse } from '../../../api/uploader/uploader.types';
import { showSnackBarPayload, snackbarTypesEnum, useSnackBarStore } from '../../../stores/snackbarStore/snackBarStore';
import { Icon } from '@iconify/react';
import addIcon from "@iconify-icons/solar/add-circle-bold"
import { DebtDetailContent } from '../../bottom-sheet-contents/debtDetail/debt-detail-content';

export default function GroupDetail() {
  const userId = useUserStore().getUserInfo().id;

  const { id: groupId } = useParams();
  const groupIdNum = Number(groupId);
  const { data, isLoading, error, refetch } = useGroupDetail(groupIdNum);
  const { isOpen, setBottomSheet } = useBottomSheetStore();
  const showSnackbar = useSnackBarStore((s) => s.showSnackbar);

  const updateGroupImage = (response:updaloerResponse)=>{
    data.group.image = response.fullURL
    const payload:UpdateGroupDto = {
      name:data.group.name,
      image:data.group.image
    }
    updateGroupApi(groupIdNum,payload).then(()=>{
      const snackBarPaylaod:showSnackBarPayload = {
        description:'اطلاعات گروه با موفقیت تعییر یافت',
        type:snackbarTypesEnum.success
      }
      showSnackbar(snackBarPaylaod)
    })
  }

  const getUniqueBills = (items: any[]) => {
    const map = new Map<string, any>();

    for (const item of items) {
      const date = new Date(item.createdAt);

      const key = [
        item.referenceId,
      ].join('|');
      if (!map.has(key)) {
        map.set(key, item);
      }
    }

    return Array.from(map.values());
  };

  const openCreateBillBottomSheet = () => {
    setBottomSheet({
      isOpen: true,
      title:'بدهی جدیدی ایجاد کنید.',
      BottomSheetContent: <CreateDebtContent groupIdProps={groupIdNum} />,
    });
  };
  
  const getBillsDetailData = (referenceId:string)=>{


    console.log('name',name,data.bills);
    
      const filteredItem = data.bills.filter((item:any)=>{ return item.referenceId === referenceId})
  
   return filteredItem
  };


    const openDebtDetailBottomSheet = (billReferenceId:any) => {
      console.log(billReferenceId);
      
     const debtsData  =  getBillsDetailData(billReferenceId)
     console.log('data',debtsData);

    setBottomSheet({
      isOpen: true,
      title:'جزییات دیون',
      size:'xl',
      BottomSheetContent: <DebtDetailContent debtsData={debtsData} />,
    });
  };




const getBillProgressColor = (percent: number) => {
  console.log(percent);
  
  if (percent < 50) return 'red';
  if (percent >= 50 && percent < 75) return 'yellow';
  if (percent >= 75) return 'green';
  return 'blue';
};

  return (
    <div className="absolute bg-gradient-to-b from-slate-800-300 to-neutral-600 h-full  w-full top-0 right-0">
      <div
        id="header"
        className="flex items-center justify-between !p-3 !border-b !border-neutral-300"
      >
        <div className="flex items-center justify-start gap-2">
       <div  >
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
            {data && data.group && data.group.name ? (
              <span>{data.group.name}</span>
            ) : (
              <span>
                <Spinner />
              </span>
            )}
          </h1>
        </div>
      </div>
      <div id="body" className="overflow-auto !h-full">
        <div className=" bg-neutral-700 overflow-auto !p-3  w-full flex flex-col gap-2">
          <p className="!text-sm !font-medium !leading-7">اعضا گروه</p>
          <div className=" w-full flex items-center gap-3 ">
            {data?.members &&
              data.members.map((member: { user: userDto }) => {
                return (
                  <div key={member.user.id} className="flex flex-col items-center justify-center gap-1 ">
                    <Avatar.Root size="lg">
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
        <div className="  overflow-auto !p-3  w-full flex flex-col gap-2">
          <p className="!text-sm !font-medium !leading-7">دیون</p>
          <div className=" w-full flex flex-col items-center gap-3 ">
            {data?.pendingBills && data.pendingBills ? (
              getUniqueBills(data.pendingBills).map((bill: any) => {
                const date = new Date()
                const paidPercent = (bill.paid / bill.amount) * 100 ;
                return (
                  <div
                    key={`${bill.id}`}
                    onClick={()=> openDebtDetailBottomSheet(bill.referenceId)}
                    className="flex flex-col w-full relative overflow-hidden justify-items-center !content-center !justify-center  gap-2 !p-7  text-neutral-800 bg-slate-100 !rounded-xl"
                  >
                  <div  className="flex w-full !justify-between   " >
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
                      
                      <Progress.Root  maxW={'12/12'}  min={0} max={100} colorPalette={getBillProgressColor(paidPercent || 2)} className="!w-full" defaultValue={paidPercent || 2}>
                        <Progress.Track>
                          <Progress.Range />
                        </Progress.Track>
                        <Progress.Label />
                        <Progress.ValueText />
                      </Progress.Root>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>بدهی یافت نشد</div>
            )}
          </div>
        </div>
      </div>
      <div className="!fixed bottom-16 flex items-center justify-end !p-4 !w-full">
        <Button
          className="!fixed bottom-16 !w-[56px] !h-[56px] !p-1 !rounded-full !shadow-2xl !bg-gray-200 !border-2 !border-teal-700"
          onClick={openCreateBillBottomSheet}
        >

            <Icon icon={addIcon} className='!w-[56px] !h-[56px] !text-teal-700' />
         
        </Button>
      </div>
    </div>
  );
}
