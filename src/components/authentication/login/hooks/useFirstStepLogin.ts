import { useCallback, useState } from 'react';
import { authAPI } from '../../../../api/authAPI';
import { authActionCreators } from '../../../../slices/authSlice';

export const useFirstStepLogin = (setStepLogin: (value: number) => void) => {
  const { checkEmailLogin } = authAPI();
  const [emailError, setEmailError] = useState<string>();
  const { setAuthUserData } = authActionCreators();
  const verifyEmail = useCallback((email: string) => {
    checkEmailLogin({
      onSuccess: (response) => {
        console.log(response);
        setAuthUserData({ key: 'email', value: email });
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

  const sendCode = useCallback((phone: string) => {
    setStepLogin(2);
    console.log(phone);
  }, []);

  return { sendCode, verifyEmail, emailError };
};
