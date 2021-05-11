import { useState } from 'react';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authAPI } from '../../../../api/authAPI';
import { useSearchParams } from '../../../../hooks/useSearchParams';
import { ModalParams } from '../../../../types/routing';

export const useCreateNewPassword = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [error, setError] = useState<string>();
  const { resetPassword } = authAPI();

  const {
    email: { value: email },
    token: { value: token },
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams('email', 'token', ModalParams.Auth);

  const create = (password: string, confirmPassword: string) => {
    setStatus(APIStatus.Loading);
    resetPassword({
      onError: (errorResponse) => {
        setStatus(APIStatus.Loading);
        setError(typeof errorResponse === 'string' ? errorResponse : errorResponse.password[0]);
      },
      onSuccess: () => {
        setStatus(APIStatus.Success);
        setAuthValue(undefined);
      },
      payload: {
        password,
        password_confirmation: confirmPassword,
        email,
        token
      }
    });
  };

  return { create, status, error };
};
