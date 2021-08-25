import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';

const fetchSearch = (args) => {
  return callAPI({
    url: 'search',
    config: {
      headers: {
        Accept: 'application/json',
      },
      // params: args.payload.params,
    },
    ...args,
  });
};

const APIs = {
  fetchSearch,
};

export const searchAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...APIs,
  },
  dispatch);
};
