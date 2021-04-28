import { useCallback } from 'react';
import { RegisterType } from '../../../../contexts/AuthContext';

export const useVerifyCodeSend = () => {
  const send = useCallback((code: string, setRegisterStep: (value: number) => void, registerType: RegisterType) => {
    if (code) {
      if (registerType === RegisterType.Email) {
        setRegisterStep(4);
      } else {
        setRegisterStep(5);
      }
    }
    return code;
  }, []);

  return { send };
};
