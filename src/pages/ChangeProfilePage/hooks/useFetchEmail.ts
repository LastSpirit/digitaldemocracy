import { useState, useCallback } from 'react';
import { profileAPI } from 'src/api/profileAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchEmail = () => {
  const [statusCheckEmail, setStatusCheckEmail] = useState<APIStatus>(APIStatus.Initial);
  const [statusEmailCode, setStatusEmailCode] = useState(APIStatus.Initial);
  const [statusEmailMessage, setStatusEmailMessage] = useState('');
  const [statusCodeMessage, setStatusCodeMessage] = useState('');
  const [mail, setMail] = useState('');
  const token = getItem('token');
  const { checkAttachEmail, attachEmail } = profileAPI();

  const sendEmail = (email) => {
    setStatusCheckEmail(APIStatus.Loading);
    checkAttachEmail({
      onSuccess: (response) => {
        console.log(response);
        setStatusCheckEmail(APIStatus.Success);
        setMail(response);
      },
      onError: (errorResponse) => {
        setStatusCheckEmail(APIStatus.Failure);
        if (errorResponse?.email) {
          setStatusCodeMessage(errorResponse.email[0]);
        } else if (typeof errorResponse === 'string') {
          setStatusCodeMessage(errorResponse);
        }
      },
      payload: {
        params: {
          email,
        },
        token,
      },
    });
  };

  const sendCodeEmail = (code) => {
    setStatusEmailCode(APIStatus.Loading);
    attachEmail({
      onSuccess: (response) => {
        setStatusEmailCode(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setStatusEmailCode(APIStatus.Failure);
      },
      payload: {
        params: {
          code,
        },
        token,
      },
    });
  };

  return {
    sendEmail,
    sendCodeEmail,
    mail,
    statusEmailCode,
    statusCheckEmail,
    statusEmailMessage,
    statusCodeMessage,
  };
};
