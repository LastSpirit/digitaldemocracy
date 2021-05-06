import { useState } from 'react';
import { useSelector } from 'react-redux';
import { authAPI } from '../../../../api/authAPI';
import { authSelectors } from '../../../../slices/authSlice';

export const useVerifyFirebaseCode = (setRegisterStep: (value: number) => void) => {
  const [error, setError] = useState('');
  const { phone } = useSelector(authSelectors.getUserData());
  const { registerViaPhone } = authAPI();
  const verify = (verificationCode: string) => {
    window.confirmationResult.confirm(verificationCode).then((result) => {
      registerViaPhone({
        onSuccess: (response) => {
          console.log(response);
          setRegisterStep(5);
        },
        onError: (errorResponse) => {
          if (typeof errorResponse === 'string') {
            setError(errorResponse);
          } else if (errorResponse.FirebaseToken) setError(errorResponse.FirebaseToken[0]);
          else setError(errorResponse.phone[0]);
        },
        payload: {
          phone,
          FirebaseToken: result.user.refreshToken
        }
      });
      console.log('RES: ', result);
    }).catch((err) => {
      setError(err.message);
      console.log(err);
    });
  };
  return { verify, error };
};
