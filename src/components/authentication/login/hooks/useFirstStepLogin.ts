import { useCallback } from 'react';

export const useFirstStepLogin = (setStepLogin: (value: number) => void) => {
  const verifyEmail = useCallback((email: string) => {
    console.log(email);
    setStepLogin(2);
  }, []);

  const sendCode = useCallback((phone: string) => {
    console.log(phone);
    setStepLogin(2);
  }, []);

  return { sendCode, verifyEmail };
};
