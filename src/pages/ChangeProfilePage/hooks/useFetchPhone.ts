import { useState, useCallback } from 'react';
import { profileAPI } from 'src/api/profileAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';

export const useFetchPhone = () => {
  const [statusCheckPhone, setStatusCheckPhone] = useState<APIStatus>(APIStatus.Initial);
  const [statusPhoneCode, setStatusPhoneCode] = useState(APIStatus.Initial);
  const [statusPhoneMessage, setStatusPhoneMessage] = useState('');
  const [statusCodeMessage, setStatusCodeMessage] = useState('');
  const [tele, setTele] = useState('');
  const token = getItem('token');
  const { checkAttachPhone, attachPhone } = profileAPI();

  const sendPhone = (phone) => {
    setStatusCheckPhone(APIStatus.Loading);
    checkAttachPhone({
      onSuccess: (response) => {
        setStatusCheckPhone(APIStatus.Success);
        setTele(response);
      },
      onError: (errorResponse) => {
        setStatusCheckPhone(APIStatus.Failure);
        if (errorResponse?.phone) {
          setStatusPhoneMessage(errorResponse.phone[0]);
        } else if (typeof errorResponse === 'string') {
          setStatusPhoneMessage(errorResponse);
        }
      },
      payload: {
        params: {
          phone,
        },
        token,
      },
    });
  };

  const sendCodePhone = (phone, FirebaseToken) => {
    setStatusPhoneCode(APIStatus.Loading);
    attachPhone({
      onSuccess: (response) => {
        setStatusPhoneCode(APIStatus.Success);
      },
      onError: (errorResponse) => {
        setStatusPhoneCode(APIStatus.Failure);
      },
      payload: {
        params: {
          phone,
          FirebaseToken,
        },
        token,
      },
    });
  };

  return {
    sendPhone,
    sendCodePhone,
    tele,
    statusPhoneCode,
    statusCheckPhone,
    statusPhoneMessage,
    statusCodeMessage,
  };
};
