import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { authActionCreators, authSelectors, AuthType } from '../../../../slices/authSlice';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authAPI, SendCodeErrorResponse } from '../../../../api/authAPI';
import { useSendCodeFirebase } from '../../common/hooks/useSendCodeFirebase';

interface UseSendCodeProps {
  values:
  {
    phone?: string,
    email?: string
  },
  registerType?: AuthType,
  setRegisterStep: (value: number) => void
}

export const useSendCode = (setRegisterStep: (value: number) => void) => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [error, setError] = useState<string>('');
  const { sendCode } = authAPI();
  const { setAuthUserData } = authActionCreators();
  const { address } = useSelector(authSelectors.getUserData());
  const { sendCode: firebaseSendCode } = useSendCodeFirebase(setRegisterStep, 3, setError);

  firebase.auth().useDeviceLanguage();

  const resetError = () => setError('');

  const onSuccess = (values: { phone?: string, email?: string }) => {
    setStatus(APIStatus.Success);
    setAuthUserData({ key: 'email', value: values.email });
    setRegisterStep(3);
  };

  const onError = (errorMessage: SendCodeErrorResponse) => {
    if (errorMessage.email) setError(errorMessage.email[0]);
    else setError(errorMessage.phone[0]);
    setStatus(APIStatus.Failure);
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        console.log(response);
      }
    });
  }, []);

  const send = useCallback(({ registerType, values } : UseSendCodeProps) => {
    setStatus(APIStatus.Loading);
    const appVerifier = window.recaptchaVerifier;
    const registerThroughPhone = registerType === AuthType.Phone;
    if (registerThroughPhone) {
      sendCode({
        onError,
        onSuccess: () => {
          setAuthUserData({ key: 'phone', value: values.phone });
          firebaseSendCode(values.phone, appVerifier);
        },
        payload: {
          address,
          phone: values.phone.replaceAll(' ', '')
        }
      });
    } else {
      sendCode({
        onError,
        onSuccess: () => onSuccess(values),
        payload: {
          address,
          email: values.email
        }
      });
    }
  }, []);

  return { send, status, error, resetError };
};
