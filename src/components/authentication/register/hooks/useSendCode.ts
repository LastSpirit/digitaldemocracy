import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { authActionCreators, authSelectors, AuthType } from '../../../../slices/authSlice';
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
  const [error, setError] = useState<string>('');
  const { sendCode } = authAPI();
  const { setAuthUserData } = authActionCreators();
  const { address } = useSelector(authSelectors.getUserData());

  const onSuccess = (isProne: boolean, values: { phone?: string, email?: string }) => {
    setStatus(APIStatus.Success);
    if (isProne) setAuthUserData({ key: 'phone', value: values.phone });
    else setAuthUserData({ key: 'email', value: values.email });
    setRegisterStep(3);
  };

  const onError = (errorMessage: string) => {
    setError(errorMessage);
    setStatus(APIStatus.Failure);
  };

  const send = useCallback(({ registerType, values } : UseSendCodeProps) => {
    setStatus(APIStatus.Loading);
    const registerThroughPhone = registerType === AuthType.Phone;
    if (registerThroughPhone) {
      firebase.auth().useDeviceLanguage();
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA token: ', response);
        }
      });

      const appVerifier = window.recaptchaVerifier;
      const provider = new firebase.auth.PhoneAuthProvider();
      provider.verifyPhoneNumber(values.phone, appVerifier)
        .then((verificationId) => {
          const verificationCode = window.prompt('Please enter the verification '
                + 'code that was sent to your mobile device.');
          return firebase.auth.PhoneAuthProvider.credential(verificationId,
            verificationCode);
        })
        .then((phoneCredential) => {
          console.log('phoneCredential: ', phoneCredential);
          firebase.auth().signInWithCredential(phoneCredential).then((res) => {
            console.log('USER DATA: ', res);
            setRegisterStep(5);
          });
        });
    } else {
      sendCode({
        onError,
        onSuccess: () => onSuccess(registerThroughPhone, values),
        payload: {
          address,
          phone: registerThroughPhone ? values.phone : undefined,
          email: !registerThroughPhone ? values.email : undefined
        }
      });
    }
  }, []);

  return { send, status, error };
};
