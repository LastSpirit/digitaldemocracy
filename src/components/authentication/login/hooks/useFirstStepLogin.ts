import { useCallback } from 'react';
import { authAPI } from '../../../../api/authAPI';

export const useFirstStepLogin = (setStepLogin: (value: number) => void) => {
  const { checkValidateAddress } = authAPI();
  const verifyEmail = useCallback((email: string) => {
    console.log(email);
    checkValidateAddress({
      onSuccess: (response) => console.log(response),
      onError: (errorResponse) => console.log(errorResponse),
    });
    // setStepLogin(2);
  }, []);

  const sendCode = useCallback((phone: string) => {
    console.log(phone);
    setStepLogin(2);
  }, []);

  return { sendCode, verifyEmail };
};
