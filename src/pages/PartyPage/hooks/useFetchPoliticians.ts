import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { APIStatus } from '../../../lib/axiosAPI';
import { partyAPI } from '../../../api/partyAPI';
import { partyActionCreators } from '../../../slices/partySlice';

export const useFetchPartyPoliticians = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const { fetchPartyPoliticians } = partyAPI();
  const { setPartyPoliticians } = partyActionCreators();
  const { sort_direction, sort_field } = useSelector((s: RootState) => s.party);

  const fetch = useCallback(
    (party_id) => {
      setStatus(APIStatus.Loading);
      fetchPartyPoliticians({
        onSuccess: (response) => {
          setPartyPoliticians(response);
          setStatus(APIStatus.Success);
        },
        onError: () => setStatus(APIStatus.Failure),
        payload: {
          party_id,
          params: {
            orderBy: sort_direction,
            sortBy: sort_field,
          },
        },
      });
    },
    [sort_direction, sort_field]
  );

  return { fetch, status };
};
