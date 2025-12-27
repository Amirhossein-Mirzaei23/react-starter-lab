import { Button, Drawer, Progress } from '@chakra-ui/react';
import { useBottomSheetStore } from '../../../stores/bottomSheetStore';

import { useSnackBarStore } from '../../../stores/snackbarStore/snackBarStore';
import BillCardTitle from '../../pendding-bills/bill-card-title';
import { numberSeprator } from '../../../utils/numberSeprator';
import { sendNotification } from '../../../api/notification/notification.service';
import { sendNotificationPayload } from '../../../api/notification/notification.types';

type props = {
  debtsData?: Array<any>;
};

export function DebtDetailContent({ debtsData }: props) {
  const { isOpen, setBottomSheet } = useBottomSheetStore();
  const showSnackbar = useSnackBarStore((s) => s.showSnackbar);
  function pushNotification(userId:number) {
    const payload:sendNotificationPayload = {
      userId:1,
      title:'test',
      message:'pay your bill!'
    }
    sendNotification(payload).then((res)=>{
      console.log(res);
      
    }).catch(err=>{
      console.error(err);
      
    })
    
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
        <div  className="grid grid-cols-1 items-center justify-center gap-4 h-auto">
          {debtsData &&
            debtsData.map((debt) => {
              const remainingAmount = debt.amount - debt.paid;
              const paidPercent = (debt.paid / debt.amount) * 100;

              return (
                <div onClick={()=> pushNotification(debt.debtor.id)} className="flex flex-row-reverse items-center justify-between !w-full bg-slate-200 !p-3 !border-2 !border-neutral-700 !rounded-xl relative">
                  <div className="flex flex-col items-center">
                    <BillCardTitle
                      title={debt.debtor.name}
                      image={debt.debtor.image || ''}
                    ></BillCardTitle>
                  </div>
                  <div className="flex gap-1 items-center text-slate-950">
                    <span>مانده:</span>
                    {remainingAmount ? (
                      <p>{numberSeprator(remainingAmount)}</p>
                    ) : (
                      <p>این بدهی پرداخت شده است</p>
                    )}
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
