import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callAPI } from '../lib/axiosAPI';

const fetchProfile = (args) => {
  return callAPI({
    url: 'getUserForEditProfile',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });
};
const APIs = {
  fetchProfile,
};

export const profileAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
