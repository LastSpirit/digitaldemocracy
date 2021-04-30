import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { authAPI } from '../../../../api/authAPI';
import { authSelectors } from '../../../../slices/authSlice';
import { setItem } from '../../../../lib/localStorageManager';
import { APIStatus } from '../../../../lib/axiosAPI';

export const useRegister = () => {
  const { register } = authAPI();
  const userData = useSelector(authSelectors.getUserData());
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const onRegister = useCallback((password: string, setRegisterStep: (value: number) => void) => {
    setStatus(APIStatus.Loading);
    register({
      onSuccess: (response) => {
        setItem('token', response.token);
        setStatus(APIStatus.Success);
        setRegisterStep(5);
      },
      onError: () => setStatus(APIStatus.Failure),
      payload: {
        address: userData.address!,
        ...userData
      }
    });
  }, []);

  return { onRegister, status };
};
