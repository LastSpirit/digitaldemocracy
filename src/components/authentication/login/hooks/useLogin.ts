import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { authAPI } from '../../../../api/authAPI';
import { authSelectors } from '../../../../slices/authSlice';
import { setItem } from '../../../../lib/localStorageManager';
import { userActionCreators } from '../../../../slices/userSlice';

export const useLogin = () => {
  const { authViaEmailConfirmPassword } = authAPI();
  const { setUser } = userActionCreators();
  const { email } = useSelector(authSelectors.getUserData());
  const [error, setError] = useState<string>();

  const passwordVerify = useCallback((password: string, rememberMe: boolean) => {
    console.log('passwordVerify', rememberMe, password);
    authViaEmailConfirmPassword({
      onSuccess: (response) => {
        setItem('token', response.data.token, !rememberMe ? 'false' : undefined);
        setUser(response.data.user);
      },
      onError: (errorResponse) => {
        setError(errorResponse.password[0]);
      },
      payload: {
        email,
        password,
      }
    });
  }, []);

  const codeVerify = useCallback((code: string) => {
    console.log('codeVerify', code);
  }, []);

  return { passwordVerify, codeVerify, error };
};
