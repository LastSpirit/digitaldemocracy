import { useCallback, useState } from 'react';
import { authActionCreators, AuthType } from '../../../../slices/authSlice';
import { APIStatus } from '../../../../lib/axiosAPI';
import { authAPI } from '../../../../api/authAPI';

interface UseSendCodeProps {
  values:
  {
    phone?: string,
    email?: string
  },
  registerType?: AuthType,
  setRegisterStep: (value: number) => void
}

export const useSendCode = (setRegisterStep: (value: number) => void) => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { sendCode } = authAPI();
  const { setAuthUserData } = authActionCreators();

  const onSuccess = (isProne: boolean, values: { phone?: string, email?: string }) => {
    setStatus(APIStatus.Success);
    if (isProne) setAuthUserData({ key: 'phone', value: values.phone });
    else setAuthUserData({ key: 'email', value: values.email });
    setRegisterStep(3);
  };

  const onError = () => {
    setStatus(APIStatus.Failure);
  };

  const send = useCallback(({ registerType, values } : UseSendCodeProps) => {
    setStatus(APIStatus.Loading);
    const registerThroughPhone = registerType === AuthType.Phone;
    sendCode({
      onError,
      onSuccess: () => onSuccess(registerThroughPhone, values),
      payload: {
        phone: registerThroughPhone ? values.phone : undefined,
        email: !registerThroughPhone ? values.email : undefined
      }
    });
  }, []);

  return { send, status };
};
