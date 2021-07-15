import { useState } from 'react';
import { profileAPI } from 'src/api/profileAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { getItem } from '../../../lib/localStorageManager';
import { profileActionCreators } from '../../../slices/profileSlice';

export const useFetchProfileInfo = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const token = getItem('token');
  const { fetchProfile } = profileAPI();
  const { setProfileInfo } = profileActionCreators();
  const fetch = () => {
    setStatus(APIStatus.Loading);
    fetchProfile({
      onSuccess: (response) => {
        setProfileInfo(response);
        setStatus(APIStatus.Success);
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
        setStatus(APIStatus.Failure);
      },
      payload: {
        token,
      },
    });
  };

  return { fetch, status };
};
