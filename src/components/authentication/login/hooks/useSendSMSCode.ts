import { useCallback } from 'react';

export const useSendSMSCode = () => {
  const send = useCallback((phone: string) => {
    console.log(phone);
  }, []);

  return { send };
};
