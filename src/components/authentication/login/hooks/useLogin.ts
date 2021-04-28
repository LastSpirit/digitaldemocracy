import { useCallback } from 'react';

export const useLogin = () => {
  const passwordVerify = useCallback((password: string, rememberMe: boolean) => {
    console.log('passwordVerify', rememberMe, password);
  }, []);

  const codeVerify = useCallback((code: string) => {
    console.log('codeVerify', code);
  }, []);

  return { passwordVerify, codeVerify };
};
