import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelectors, AuthType } from '../../../../slices/authSlice';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authAPI } from '../../../../api/authAPI';
import { setItem } from '../../../../lib/localStorageManager';

export const useVerifyCodeSend = (setRegisterStep: (value: number) => void) => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [error, setError] = useState<string>('');
  const { verifyCode } = authAPI();
  const { email } = useSelector(authSelectors.getUserData());
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
      onError: (errorResponse) => {
        setStatus(APIStatus.Failure);
        setError(errorResponse.message);
      },
      payload: {
        code,
        email
      }
    });
  }, []);

  return { send, status, error };
};
