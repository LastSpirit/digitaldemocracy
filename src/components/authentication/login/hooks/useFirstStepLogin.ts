import { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase';
import { authAPI } from '../../../../api/authAPI';
import { authActionCreators } from '../../../../slices/authSlice';
import { useSendCodeFirebase } from '../../common/hooks/useSendCodeFirebase';
import { APIStatus } from '../../../../lib/axiosAPI';

export const useFirstStepLogin = (setStepLogin: (value: number) => void) => {
  const { checkValidateEmail, checkValidatePhone } = authAPI();
  const [emailError, setEmailError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [emailStatus, setEmailStatus] = useState<APIStatus>(APIStatus.Initial);
  const [phoneStatus, setPhoneStatus] = useState<APIStatus>(APIStatus.Initial);
  const { setAuthUserData } = authActionCreators();
  const { sendCode: sendFirebaseCode } = useSendCodeFirebase(setStepLogin, 2, setPhoneError);

  const verifyEmail = useCallback((email: string) => {
    setEmailStatus(APIStatus.Loading);
    checkValidateEmail({
      onSuccess: () => {
        setAuthUserData({ key: 'email', value: email });
        setStepLogin(2);
        setEmailStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setEmailError(typeof errorResponse === 'string' ? errorResponse : errorResponse.email[0]);
        setEmailStatus(APIStatus.Failure);
      },
      payload: {
        email,
      }
    });
  }, []);

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: () => {}
    });
  }, []);

  const sendCode = useCallback((phone: string) => {
    setPhoneStatus(APIStatus.Loading);
    checkValidatePhone({
      onSuccess: () => {
        setAuthUserData({ key: 'phone', value: phone });
        const appVerifier = window.recaptchaVerifier;
        sendFirebaseCode(phone, appVerifier);
        setPhoneStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setPhoneError(typeof errorResponse === 'string' ? errorResponse : errorResponse.phone[0]);
      },
      payload: {
        phone
      }
    });
  }, []);

  return { sendCode, verifyEmail, emailError, phoneError, status: { emailStatus, phoneStatus } };
};
