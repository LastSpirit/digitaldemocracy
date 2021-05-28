import { useCallback, useState } from 'react';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authAPI } from '../../../../api/authAPI';
import { authActionCreators } from '../../../../slices/authSlice';

export const useCheckAddress = (setRegisterStep: (value: number) => void) => {
  const { checkValidateAddress } = authAPI();
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const [error, setError] = useState<string>();
  const { setAuthUserData } = authActionCreators();

  const onError = (errorResponse: string) => {
    setStatus(APIStatus.Failure);
    setError(errorResponse);
  };

  const onSuccess = (address: string, country: number) => {
    setAuthUserData({ key: 'address', value: address });
    setAuthUserData({ key: 'countryId', value: String(country) });
    setRegisterStep(2);
    setStatus(APIStatus.Success);
  };

  const check = useCallback((address: string, country: string, withCountry: boolean, countries: Array<{ id: number, title: string }>) => {
    let countryId;
    if (withCountry) {
      countryId = countries.find((item) => item.title === country).id;
    }
    setStatus(APIStatus.Loading);
    checkValidateAddress({
      onSuccess: () => onSuccess(address, countryId),
      onError,
      payload: {
        address,
        country_id: (withCountry && countryId) ? countryId : undefined
      }
    });
  }, []);

  return {
    check,
    status,
    error,
  };
};
