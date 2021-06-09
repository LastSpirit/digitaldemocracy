import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { APIRequest, callAPI } from '../lib/axiosAPI';

interface PartyRequest {
  type: string;
  token: string;
  source_link?: string;
  description?: string;
}

interface PartyResponse {
  data?: string;
}

const fetchParty: APIRequest<PartyRequest, PartyResponse> = (args) => {
  return callAPI({
    url: '',
    config: {
      headers: {
        method: 'GET',
      },
    },
    ...args,
  });
};

const APIs = {
  fetchParty,
};

export const partyAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
