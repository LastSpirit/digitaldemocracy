import { useCallback, useState } from 'react';
import { AuthType } from '../../../../slices/authSlice';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authAPI } from '../../../../api/authAPI';
import { setItem } from '../../../../lib/localStorageManager';

export const useVerifyCodeSend = (setRegisterStep: (value: number) => void) => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { verifyCode } = authAPI();
  const send = useCallback((code: string, registerType: AuthType) => {
    setStatus(APIStatus.Loading);
    verifyCode({
      onSuccess: (response) => {
        setStatus(APIStatus.Success);
        if (registerType === AuthType.Email) setRegisterStep(4);
        else {
          setItem('token', response.token);
          setRegisterStep(5);
        }
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        code
      }
    });
  }, []);

  return { send, status };
};
