import { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase';
import { authAPI } from '../../../../api/authAPI';
import { authActionCreators } from '../../../../slices/authSlice';
import { useSendCodeFirebase } from '../../common/hooks/useSendCodeFirebase';

export const useFirstStepLogin = (setStepLogin: (value: number) => void) => {
  const { checkEmailLogin } = authAPI();
  const [emailError, setEmailError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const { setAuthUserData } = authActionCreators();
  const { sendCode: sendFirebaseCode } = useSendCodeFirebase(setStepLogin, 2, setPhoneError);
  const verifyEmail = useCallback((email: string) => {
    setAuthUserData({ key: 'email', value: email });
    setStepLogin(2);
    checkEmailLogin({
      onSuccess: (response) => {
        console.log(response);
        setAuthUserData({ key: 'email', value: email });
        setStepLogin(2);
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
        setEmailError(errorResponse.email[0]);
      },
      payload: {
        email,
      }
    });
  }, []);

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        console.log(response);
      }
    });
  }, []);

  const sendCode = useCallback((phone: string) => {
    setAuthUserData({ key: 'phone', value: phone });
    const appVerifier = window.recaptchaVerifier;
    sendFirebaseCode(phone, appVerifier);
  }, []);

  return { sendCode, verifyEmail, emailError, phoneError };
};
