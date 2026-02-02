import { Button, Drawer, Progress, Spinner } from '@chakra-ui/react';
import { useBottomSheetStore } from '../../../stores/bottomSheetStore';

import { showSnackBarPayload, snackbarTypesEnum, useSnackBarStore } from '../../../stores/snackbarStore/snackBarStore';
import BillCardTitle from '../../pendding-bills/bill-card-title';
import { numberSeprator } from '../../../utils/numberSeprator';
import { sendNotification } from '../../../api/notification/notification.service';
import { sendNotificationPayload } from '../../../api/notification/notification.types';
import { useUserStore } from '../../../stores/userStore/userStore';
import alramBold from '@iconify-icons/solar/alarm-bold';
import { Icon } from '@iconify/react';
import { useState } from 'react';

type props = {
  debtsData?: Array<any>;
  group: any;
};

export function DebtDetailContent({ debtsData, group }: props) {
  const { isOpen, setBottomSheet } = useBottomSheetStore();
  const [loadingButtons, setLoadingButtons] = useState<{ [key: string]: boolean }>({});

  const showSnackbar = useSnackBarStore((s) => s.showSnackbar);

  const userId2 = useUserStore().getUserInfo().id;

  function pushNotification(debt: any) {
    console.log(group);

    const userId = debt.debtor.id;
    const payload: sendNotificationPayload = {
      userId: userId,
      title: 'یادآوری پرداخت بدهی',
      message:
        'سلام ' +
        debt.debtor.name +
        ' عزیز! لطفاً قبض "' +
        debt.title +
        '" خود را در گروه ' +
        group.name +
        ' به موقع پرداخت کنید تا دوستانتان خوشحال شوند.',
    };
        setLoadingButtons((prev) => ({ ...prev, [debt.id]: true }));
    sendNotification(payload)
      .then((res) => {
        console.log(res);
        const snackBarPayload: showSnackBarPayload = {
                  type: snackbarTypesEnum.success,
                  description: 'نوتیفیکیشن با موفقیت ارسال شد',
                };
                showSnackbar(snackBarPayload);
        closeBottomSheet()
      })
      .catch((err) => {
        console.error(err);
        
      }).finally(()=>{
        console.log('fan');
        
       setLoadingButtons((prev) => ({ ...prev, [debt.id]: false }));
      });
  }

  const getBillProgressColor = (percent: number) => {
    console.log(percent);

    if (percent < 50) return 'red';
    if (percent >= 50 && percent < 75) return 'yellow';
    if (percent >= 75) return 'green';
    return 'blue';
  };

  function closeBottomSheet() {
    setBottomSheet({ isOpen: false });
  }

  return (
    <>
      <Drawer.Body className="!overflow-visible">
        <div className="grid grid-cols-1 items-center justify-center gap-4 h-auto">
          {debtsData &&
            debtsData.map((debt) => {
              const remainingAmount = debt.amount - debt.paid;
              const paidPercent = (debt.paid / debt.amount) * 100;

              return (
               <div className={remainingAmount == 0?  'opacity-25':  'opacity-100' } >
                 <div className="grid grid-cols-6 items-center !w-full ">
                  <div className="!h-full col-span-1 translate-x-px " style={{paddingTop:'2px',paddingBlock:'2px'}} >
                    <Button disabled={remainingAmount == 0} onClick={() => pushNotification(debt)} loading={loadingButtons[debt.id]} className="!bg-slate-200  !border-1 !border-slate-400 !h-full flex !rounded-xl !opacity-100">
                      {/* ارسال یادآوری */}

                      <Icon icon={alramBold}></Icon>
                    </Button>
                  </div>
                  <div
                    
                    className="col-span-5 flex flex-row-reverse items-center justify-between !w-full bg-slate-200 !p-3   !border-1 !border-slate-400  !rounded-xl relative"
                  >
                    <div className="flex flex-col items-center">
                      <BillCardTitle
                        title={debt.debtor.name}
                        image={debt.debtor.image || ''}
                      ></BillCardTitle>
                    </div>
                    <div className="flex gap-1 items-center text-slate-950">
                     
                      {remainingAmount ? (
                        <p> <span>مانده:</span>{numberSeprator(remainingAmount)}</p>
                      ) : (
                        <p>پرداخت شده</p>
                      )}
                    </div>
                  </div>
                </div>
               </div>
              );
            })}
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
          >
            تایید
          </Button>
        </div>
      </Drawer.Footer>
    </>
  );
}
