import { Avatar, AvatarGroup } from '@chakra-ui/react';
import { FriendDto } from '../../api/users/user.types';
import { Icon } from '@iconify/react';
import heartsBoldIcon from '@iconify-icons/solar/hearts-bold';
import { ReactNode } from 'react';

type props = {
  title: string;
  amount?: number;
  image?: string;
  date?: number;
  onSelect?: void;
  status?: 'debt' | 'credit';
  subtitle?: string;
  billGroup?: Array<FriendDto>;
  customElement?: ReactNode;
};
function dateToString(date: number) {
  return 'Mar 24, 2034';
}

function renderDebtStatusHtml(status: string | undefined) {
  return (
    <div>
      {status === 'credit' ? (
        <span className="">مجموع طلب شما</span>
      ) : (
        <span className="">مجموع بدهی شما</span>
      )}
    </div>
  );
}

export default function FriendCard({
  title,
  amount,
  image,
  status,
  subtitle,
  customElement,
}: props) {
  return (
    <div className="bg-slate-100 w-full !p-2 rounded-2xl">
      <div className="flex justify-between items-center">
        {customElement && (
          <div id="custom-elemnt from parent" className="flex-1">
            {customElement}
          </div>
        )}
        {!customElement && (
          <p className="!text-xl !font-bold text-slate-950">
            {amount && (
              <span className={status === 'credit' ? 'text-green-800' : 'text-red-800'}>
                {amount}T
              </span>
            )}
          </p>
        )}

        <div className="flex flex-row-reverse items-center gap-2">
          <AvatarGroup>
            <Avatar.Root size="2xl">
              <Avatar.Fallback name={title} />
              <Avatar.Image src={image} />
            </Avatar.Root>
          </AvatarGroup>

          <div className="flex flex-col items-end  text-slate-800">
            <div dir="ltr">
              {title && <p className="!text-lg !font-medium text-neutral-800">{title}</p>}
              {subtitle && <p className="!text-xs !font-light text-neutral-700">{subtitle}</p>}
            </div>
            {amount > 0 && (
              <div className="!text-xs  !font-light leading-5 text-nowrap flex flex-nowrap gap-1">
                {renderDebtStatusHtml(status)}
                <span className={status === 'credit' ? 'text-green-400' : 'text-rose-800'}>
                  {amount}
                </span>
              </div>
            )}
            {!amount && status && (
              <div className="!text-xs !font-light leading-5 flex flex-nowrap gap-1">
                <span>شما بی حساب هستید</span>
                <Icon className="!text-lg" icon={heartsBoldIcon} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
