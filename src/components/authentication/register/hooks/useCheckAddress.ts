import { useCallback, useState } from 'react';
// import { authAPI } from '../../../../api/authAPI';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authActionCreators } from '../../../../slices/authSlice';
// import { authAPI } from '../../../../api/authAPI';

export const useCheckAddress = (setRegisterStep: (value: number) => void) => {
  // const { checkValidateAddress } = authAPI();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  // const [error, setError] = useState<string>();
  const { setAuthUserData } = authActionCreators();

  // const onError = (errorResponse: string) => {
  //   setStatus(APIStatus.Failure);
  //   setError(errorResponse);
  // };

  const onSuccess = (address: string) => {
    setAuthUserData({ key: 'address', value: address });
    setRegisterStep(2);
    setStatus(APIStatus.Success);
  };

  const check = useCallback((address: string) => {
    setStatus(APIStatus.Loading);
    onSuccess(address);
    // checkValidateAddress({
    //   onSuccess: () => onSuccess(address),
    //   onError: (errorResponse) => onError(errorResponse.message),
    //   payload: {
    //     address
    //   }
    // });
  }, []);

  return {
    check,
    status,
    error: undefined,
  };
};
