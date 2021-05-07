import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { authAPI } from '../../../../api/authAPI';
import { authSelectors } from '../../../../slices/authSlice';
import { setItem } from '../../../../lib/localStorageManager';
import { userActionCreators } from '../../../../slices/userSlice';
import { ModalParams } from '../../../../types/routing';
import { useSearchParams } from '../../../../hooks/useSearchParams';

export const useLogin = () => {
  const { authViaEmailConfirmPassword, loginViaPhone } = authAPI();
  const { setUser } = userActionCreators();
  const { authUserData: { email, phone } } = useSelector(authSelectors.getAllData());
  const [error, setError] = useState<string>();

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const passwordVerify = useCallback((password: string, rememberMe: boolean) => {
    setError(undefined);
    authViaEmailConfirmPassword({
      onSuccess: (response) => {
        setItem('token', response.data.token, !rememberMe ? 'false' : undefined);
        setUser(response.data.user);
      },
      onError: (errorResponse) => {
        setError(errorResponse.password ? errorResponse.password[0] : errorResponse.email[0]);
      },
      payload: {
        email,
        password,
      }
    });
  }, []);

  const codeVerify = useCallback((code: string) => {
    setError(undefined);
    window.confirmationResult.confirm(code).then((result) => {
      loginViaPhone({
        onSuccess: (response) => {
          setItem('token', response.token);
          setUser(response.user);
          console.log('serverResponse: ', response);
          setAuthValue(undefined);
        },
        onError: (errorResponse) => {
          if (typeof errorResponse === 'string') {
            setError(errorResponse);
          } else if (errorResponse.FirebaseToken) setError(errorResponse.FirebaseToken[0]);
          else setError(errorResponse.phone[0]);
        },
        payload: {
          phone,
          FirebaseToken: result.user.za // idToken
        }
      });
      console.log('RES: ', result);
    }).catch((err) => {
      setError(err.message);
      console.log(err);
    });
  }, []);

  return { passwordVerify, codeVerify, error };
};
