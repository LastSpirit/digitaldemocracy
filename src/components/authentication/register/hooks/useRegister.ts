import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { authAPI } from '../../../../api/authAPI';
import { authSelectors } from '../../../../slices/authSlice';
import { setItem } from '../../../../lib/localStorageManager';
import { APIStatus } from '../../../../lib/axiosAPI';
import { userActionCreators } from '../../../../slices/userSlice';

export const useRegister = () => {
  const { register } = authAPI();
  const userData = useSelector(authSelectors.getUserData());
  const { setUser } = userActionCreators();

  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [passError, setPassError] = useState<string>();
  const [confPassError, setConfPassError] = useState<string>();

  const onRegister = useCallback((password: string, confirmPassword: string, setRegisterStep: (value: number) => void) => {
    setStatus(APIStatus.Loading);
    register({
      onSuccess: (response) => {
        setItem('token', response.data.token);
        setUser(response.data.user);
        setStatus(APIStatus.Success);
        setRegisterStep(5);
      },
      onError: (errorResponse) => {
        if (errorResponse.password_confirmation) setConfPassError(errorResponse.password_confirmation[0]);
        if (errorResponse.password) setPassError(errorResponse.password[0]);
        setStatus(APIStatus.Failure);
      },
      payload: {
        ...userData,
        password,
        password_confirmation: confirmPassword,
        address: userData.address!,
        code: userData.code!,
      }
    });
  }, []);

  return { onRegister, status, error: { passError, confPassError } };
};
