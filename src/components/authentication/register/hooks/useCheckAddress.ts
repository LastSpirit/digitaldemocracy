import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { authAPI } from '../../../../api/authAPI';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authActionCreators } from '../../../../slices/authSlice';

export const useCheckAddress = (setRegisterStep: (value: number) => void) => {
  const { checkValidateAddress } = authAPI();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [error, setError] = useState<AxiosError<any>>();
  const { setAuthUserData } = authActionCreators();

  const onError = (errorResponse: AxiosError<any>) => {
    setStatus(APIStatus.Failure);
    setError(errorResponse);
    console.log(errorResponse);
  };

  const onSuccess = (address: string) => {
    setStatus(APIStatus.Success);
    setRegisterStep(2);
    setAuthUserData({ key: 'address', value: address });
  };

  const check = useCallback((address: string) => {
    setStatus(APIStatus.Loading);
    checkValidateAddress({
      onSuccess: () => onSuccess(address),
      onError,
      payload: {
        address
      }
    });
  }, []);

  return {
    check,
    status,
    error,
  };
};
