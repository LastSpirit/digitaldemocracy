import { useCallback } from 'react';
import { AuthType } from '../../../../slices/authSlice';

interface UseSendCodeProps {
  values:
  {
    phone?: string,
    email?: string
  },
  registerType?: AuthType,
  setRegisterStep: (value: number) => void
}

export const useSendCode = () => {
  const send = useCallback(({ registerType, setRegisterStep, values } : UseSendCodeProps) => {
    if (registerType === AuthType.Email) {
      console.log('EMAIL');
    } else if (registerType === AuthType.Phone) {
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
