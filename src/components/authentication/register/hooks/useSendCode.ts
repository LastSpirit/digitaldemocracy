import { useCallback } from 'react';
import { RegisterType } from '../../../../contexts/AuthContext';

interface UseSendCodeProps {
  values:
  {
    phone?: string,
    email?: string
  },
  registerType?: RegisterType,
  setRegisterStep: (value: number) => void
}

export const useSendCode = () => {
  const send = useCallback(({ registerType, setRegisterStep, values } : UseSendCodeProps) => {
    if (registerType === RegisterType.Email) {
      console.log('EMAIL');
    } else if (registerType === RegisterType.Phone) {
      console.log('PHONE');
    } else {
      console.log('ERROR');
    }
    if (values.email || values.phone) {
      setRegisterStep(3);
    }
    return values.email || values.phone;
  }, []);

  return { send };
};
