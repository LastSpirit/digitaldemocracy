import { useCallback } from 'react';

export const useRegister = () => {
  const register = useCallback((password: string, setRegisterStep: (value: number) => void) => {
    if (password) {
      console.log(password);
    }
    setRegisterStep(5);
  }, []);

  return { register };
};
