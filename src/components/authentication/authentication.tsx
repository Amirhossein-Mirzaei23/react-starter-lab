import { Button, Field, Fieldset, Input, InputGroup, Tabs } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useHeaderStore } from '../../stores/headerStore/headerStore';
import React, { useMemo, useState } from 'react';
import { useNavigationStore } from '../../stores/navigationStore/navigationStore';
import { type Options, passwordStrength } from 'check-password-strength';
import { PasswordInput, PasswordStrengthMeter } from '../ui/password-input';
import { userRegisterApi } from '../../api/authentication/register-api';
import {
  UserLoginPayload,
  UserRegisterPayload,
} from '../../api/authentication/authentication.types';
import { userLoginApi } from '../../api/authentication/login-api';
import useAuth from '../../hooks/useAuth';
import FloatingLabelInput from '../ui/floating-label-input';
import { Icon } from '@iconify/react';
import eyeOpenOutline from '@iconify-icons/solar/eye-outline';
import eyeCloseOutline from '@iconify-icons/solar/eye-closed-outline';
import { motion } from 'framer-motion';
import styles from './authentication.module.css';
import { askForPermission } from '../../utils/askForPermision';

export function Authentication() {
  const setTitle = useHeaderStore((state) => state.setTitle);
  const toggleBackButton = useHeaderStore((s) => s.toggleBackButton);
  const setAvatar = useHeaderStore((s) => s.hasAvatar);
  const sethasBackground = useHeaderStore((s) => s.sethasBackground);
  const hideNavBar = useNavigationStore((s) => s.hideNav);
  const { setAuthData } = useAuth();

  React.useEffect(() => {
    setTitle('وارد شوید');
    toggleBackButton(true);
    setAvatar(false);
    sethasBackground(false);
    hideNavBar();
  }, []);

  const navigate = useNavigate();
  const routerBack = () => {
    navigate(-1);
  };

  const strengthOptions: Options<string> = [
    { id: 1, value: 'weak', minDiversity: 0, minLength: 0 },
    { id: 2, value: 'medium', minDiversity: 1, minLength: 4 },
    { id: 3, value: 'strong', minDiversity: 2, minLength: 8 },
    { id: 4, value: 'very-strong', minDiversity: 3, minLength: 10 },
  ];
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmialError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);
  const phoneRegex = /^09\d{9}$/;
  function checkNameValidation(val: string | undefined) {
    let hasError = false;
    const email = val;
    setNameError('');
    if (isSignup && name && name.length < 1) {
      setNameError('لطفا نام خود را وارد نمایید');
      hasError = true;
    } else if (isSignup && name && name.length < 2) {
      setNameError('حداقل تعداد کارکتر دو عدد میباشد');
      hasError = true;
    }
    return hasError;
  }
  function checkEmailValidation(val: string | undefined) {
    let hasError = false;
    const email = val;
    setEmialError('');
    if (isSignup && email && email.length) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setEmialError('ایمیل وارد شده معتبر نمیباشد');
        hasError = true;
      }
    }
    return hasError;
  }
  function checPhoneValidation(val: string | undefined) {
    const phone = val;
    let hasError = false;
    setPhoneError('');

    if (!phone?.toString() || phone?.toString().length < 1) {
      setPhoneError('لطفا شماره همراه خود را وارد نمایید.');
    } else if (!phoneRegex.test(phone)) {
      setPhoneError('شماره همراه وارد شده صحیح نیست.');
      hasError = true;
    }
    return hasError;
  }
  function checPassWordValidation(val: string | undefined) {
    let hasError = false;
    setPasswordError('');
    if (strength < 2) {
      setPasswordError('قدرت رمز عبور ضعیف است.');
      hasError = true;
    }
    return hasError;
  }

  function submitForm() {
    let hasError;
    if (isSignup) {
      hasError =
        checkNameValidation(name) ||
        checPhoneValidation(phone) ||
        checkEmailValidation(email) ||
        checPassWordValidation(password);
    } else {
      hasError = checPhoneValidation(phone) || checPassWordValidation(password);
    }
    console.log(hasError);

    if (hasError) {
      return;
    }

    if (isSignup && name && phone && password) {
      const payload: UserRegisterPayload = {
        name: name,
        phone: phone,
        email: email && email?.length > 0 ? email : undefined,
        password: password,
      };
      console.log(payload);

      handleRegister(payload);
    } else {
      const payload = {
        phone,
        password,
      } as UserLoginPayload;
      handleLogin(payload);
    }
  }

  async function handleLogin(payload: UserLoginPayload) {
    try {
      const { data } = await userLoginApi(payload);
      setAuthData(data.token, data.user);
      askForPermission(data.user.id);
      navigate('/');
    } catch (err) {
      console.log('Register failed:', err);
      console.log('Register failed:', err);
    }
  }

  async function handleRegister(payload: UserRegisterPayload) {
    try {
      const { data } = await userRegisterApi(payload);
      setAuthData(data.token, data.userData);
      navigate('/');
    } catch (err) {
      console.log('Register failed:', err);
      const toadPayload = {
        title: 'خطا',
        description: 'تست',
        type: 'error',
      };
      console.log(toadPayload);
    }
  }
  const toggleFormType = (value: boolean) => {
    setIsSignup(value);
    // setTitle(value ? 'وارد شوید' : 'ثبت‌نام کنید');
  };

  return (
    <div className="flex-1 flex justify-center items-center ">
      {isSignup ? (
        <div className={styles.illustarionRight}>
          <img
            src="/illusteration/logout1.gif"
            className="rounded-2xl !w-full scale-150 !mt-6 !mr-4 shadow-neutral-300"
            alt=""
          />
        </div>
      ) : (
        <div className={styles.illustarionLeft}>
          <img
            src="/illusteration/logout2.gif"
            className="rounded-2xl !w-full scale-125 !mt-16 !ml-24 shadow-neutral-300"
            alt=""
          />
        </div>
      )}
      <motion.div
        layout
        initial={{ height: 'auto' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex flex-col items-start justify-start bg-neutral-50 !py-6 !w-full !px-7 rounded-t-4xl  absolute bottom-0"
      >
        <div className="flex flex-col items-start justify-start !w-full">
          <Tabs.Root
            variant="outline"
            defaultValue="members"
            className="!w-full"
            mb="5"
            height={'16'}
          >
            <Tabs.List className="w-full">
              <Tabs.Trigger
                onClick={() => toggleFormType(false)}
                height={'12'}
                className="w-6/12 !text-center !text-neutral-300 flex items-center justify-center !rounded-t-xl"
                value="members"
              >
                ورود
              </Tabs.Trigger>
              <Tabs.Trigger
                onClick={() => toggleFormType(true)}
                height={'12'}
                className="w-6/12 !text-center !text-neutral-300 flex items-center justify-center !rounded-t-xl"
                value="projects"
              >
                ورود و ثبت نام
              </Tabs.Trigger>
            </Tabs.List>
            {/* <Tabs.Content value="members">Manage your team members</Tabs.Content>
      <Tabs.Content value="projects">Manage your projects</Tabs.Content> */}
          </Tabs.Root>

          <Fieldset.Root size="lg" invalid>
            <div className="text-neutral-900 flex flex-col gap-5">
              <motion.div
                layout
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-neutral-900 flex flex-col gap-5"
              >
                {isSignup && (
                  <>
                    <Field.Root required invalid={nameError.length > 0}>
                      <FloatingLabelInput
                        label="نام و نام خانوادگی"
                        placeholder="نام و نام خانوادگی خود را وارد نمایید"
                        minLength={2}
                        size="md"
                        mb={4}
                        labelBgColor="#fafafa"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                      />
                      <Field.ErrorText className="absolute -bottom-1">{nameError}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root required invalid={emailError.length > 0}>
                      <FloatingLabelInput
                        label="ایمیل"
                        placeholder="(اختیاری)"
                        shadow={'none'}
                        size="md"
                        mb={4}
                        labelBgColor="#fafafa"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                      />

                      <Field.ErrorText className="absolute -bottom-1">{emailError}</Field.ErrorText>
                    </Field.Root>
                  </>
                )}
              </motion.div>

              <Field.Root required invalid={phoneError.length > 0}>
                <FloatingLabelInput
                  label="شماره تماس"
                  placeholder="شماره تماس خود را وارد کنید."
                  minLength={11}
                  type="number"
                  shadow={'none'}
                  maxLength={11}
                  size="md"
                  mb={4}
                  labelBgColor="#fafafa"
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                />

                <Field.ErrorText className="absolute -bottom-1">{phoneError}</Field.ErrorText>
              </Field.Root>
              <Field.Root required invalid={passwordError.length > 0}>
                <PasswordInput
                  value={password}
                  shadow={'none'}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="رمز عبور خود را وارد کنید."
                  visibilityIcon={{
                    on: <Icon className="text-neutral-800" icon={eyeOpenOutline} />,
                    off: <Icon className="text-neutral-800" icon={eyeCloseOutline} />,
                  }}
                />
                {password && password?.length > 0 && (
                  <div className="w-full">
                    <PasswordStrengthMeter value={strength} />
                    <p className="text-red-800 !text-xs !font-light absolute -bottom-1">
                      {passwordError}
                    </p>
                  </div>
                )}
              </Field.Root>
            </div>
            <div id="footer" className="flex items-center justify-end gap-1 ">
              <Button
                variant="plain"
                type="button"
                className="!text-sm font-medium !text-neutral-600"
                onClick={routerBack}
              >
                انصراف
              </Button>
              <Button
                onClick={submitForm}
                rounded={'lg'}
                bg={'#222'}
                type="submit"
                colorScheme="blue"
                className="w-24 !text-sm !font-medium !text-neutral-300"
              >
                {isSignup ? 'ثبت نام' : 'ورود'}
              </Button>
            </div>
          </Fieldset.Root>
        </div>
      </motion.div>
    </div>
  );
}
