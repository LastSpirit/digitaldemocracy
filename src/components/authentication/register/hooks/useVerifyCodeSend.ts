import { useCallback } from 'react';
import { AuthType } from '../../../../slices/authSlice';

export const useVerifyCodeSend = () => {
  const send = useCallback((code: string, setRegisterStep: (value: number) => void, registerType: AuthType) => {
    if (code) {
      if (registerType === AuthType.Email) {
        setRegisterStep(4);
      } else {
        setRegisterStep(5);
      }
    }
    return code;
  }, []);

  return { send };
};
