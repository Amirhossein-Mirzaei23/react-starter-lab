import { useEffect, useState } from 'react';
import { useUserStore } from '../../../stores/userStore/userStore';
import { userDto } from '../../../types';
import { getUserDataApi, updateUserDataApi } from '../../../api/users/users-services';
import { Avatar, Field, Button } from '@chakra-ui/react';
import uploaderIcon from '@iconify-icons/solar/upload-linear';
import { Icon } from '@iconify/react';
import FloatingLabelInput from '../../ui/floating-label-input';
import { updateUserPayload } from '../../../api/users/user.types';
import AvatarUploader from './avatar-uploader';
import { updaloerResponse } from '../../../api/uploader/uploader.types';
import { useBackgroundStore } from '../../../stores/backgroundStore/background.store';
import { PasswordInput } from '../../ui/password-input';
import eyeOpenOutline from '@iconify-icons/solar/eye-outline';
import eyeCloseOutline from '@iconify-icons/solar/eye-closed-outline';

export default function ProfileDetail() {
  const setBackground = useBackgroundStore((s) => s.setBackground);

  useEffect(() => {
    // BEFORE MOUNT (initial screen entry)
    setBackground('#0A0A0C'); // or any hex

    return () => {
      // BEFORE UNMOUNT (leaving screen)
      setBackground(null); // reset --> gradient background
    };
  }, []);

  const userId = useUserStore().getUserInfo().id;

  const [userData, setUserData] = useState<userDto | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  // Editable fields
  const [form, setForm] = useState<updateUserPayload>({
    name: '',
    email: '',
    image: '',
    phone: '',
    gender: '',
    password: '',
  });

  // Fetch user data once
  useEffect(() => {
    getUserDataApi(userId)
      .then((res) => {
        
        setUserData(res);

        // Prefill form
        setForm({
          name: res.name ?? '',
          image: res.image ?? '',
          email: res.email ?? '',
          phone: res.phone ?? '',
          gender: res.gender ?? '',
          password: '',
        });
      })
      .catch((err) => {
        console.error('getUserData error:', err);
      });
  }, [userId]);
  function updateUserDataImage(image: updaloerResponse) {
    console.log('image obj', image);
    setField('image', image.fullURL);
  }
  // Update user
  function updateUser() {
    if (!form.password?.length || form.password?.length < 4) {
      delete form.password;
    }
    setApiLoading(true);
    updateUserDataApi(userId, form)
      .then((res) => {
        console.log('Update Success:', res);
      })
      .catch((err) => {
        console.error('Update Error:', err);
      })
      .finally(() => {
        setApiLoading(false);
      });
  }

  // Generic change handler
  const setField = (key: keyof updateUserPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-2">
        <AvatarUploader
          image={form?.image}
          onUploaded={(image) => {
            console.log('Uploaded Image URL:', image);
            updateUserDataImage(image); // or save to store
          }}
        />
      </div>

      {/* Name */}
      <Field.Root>
        <FloatingLabelInput
          label="نام"
          labelBgColor="#0a0a0cef"
          value={form.name}
          onChange={(e) => setField('name', e.currentTarget.value)}
        />
      </Field.Root>

      {/* Email */}
      <Field.Root>
        <FloatingLabelInput
          label="ایمیل"
          labelBgColor="#0a0a0cef"
          value={form.email}
          onChange={(e) => setField('email', e.currentTarget.value)}
        />
      </Field.Root>

      {/* Phone */}
      <Field.Root>
        <FloatingLabelInput
          label="شماره تلفن"
          labelBgColor="#0a0a0cef"
          value={form.phone}
          onChange={(e) => setField('phone', e.currentTarget.value)}
        />
      </Field.Root>

      {/* Gender */}
      <Field.Root>
        <FloatingLabelInput
          label="جنسیت"
          labelBgColor="#0a0a0cef"
          placeholder="مرد / زن"
          value={form.gender}
          onChange={(e) => setField('gender', e.currentTarget.value)}
        />
      </Field.Root>

      {/* Password */}
      {/* <Field.Root>
        <FloatingLabelInput
          type="password"
          label="رمز عبور جدید"
          labelBgColor="#0a0a0cef"
          value={form.password}
          onChange={(e) => setField('password', e.currentTarget.value)}
        />
      </Field.Root> */}
      <Field.Root required>
        <PasswordInput
          shadow={'none'}
          value={form.password}
          onChange={(e) => setField('password', e.currentTarget.value)}
          placeholder="با وارد کردن این فیلد رمز عبور خود را تغییر دهید."
          visibilityIcon={{
            on: <Icon className="text-neutral-100" icon={eyeOpenOutline} />,
            off: <Icon className="text-neutral-100" icon={eyeCloseOutline} />,
          }}
        />
      </Field.Root>

      {/* Submit Button */}
      <Button
        bg="#4C8DFF"
        className="!mt-4 !text-white !rounded-xl "
        loading={apiLoading}
        onClick={updateUser}
      >
        ذخیره تغییرات
      </Button>
      <div className="absolute right-0 bottom-10 w-full">
        <img src="/illusteration/wave.svg" alt="" />
      </div>
    </div>
  );
}
