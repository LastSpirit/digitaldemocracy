import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from 'src/lib/axiosAPI';
import { searchAPI } from 'src/api/searchAPI';
import { searchSelectors, searchActionCreators } from 'src/slices/searchSlice';

export const useSearch = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const searchParams = useSelector(searchSelectors.getSearchParams());
  const {
    setSearchData
  } = searchActionCreators();
  const { fetchSearch } = searchAPI();

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchSearch({
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      onSuccess: (response) => {
        setSearchData(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        params: {
          search: searchParams.query,
          isNews: searchParams.isNews,
          isPolitician: searchParams.isPolitician,
          isParty: searchParams.isParty,
          isMedia: searchParams.isMedia,
          isAuthor: searchParams.isAuthor,
          page: searchParams.page,
          PerPage: searchParams.PerPage
        }
      }
    });
  }, [searchParams.query, searchParams.isNews, searchParams.isPolitician, searchParams.isParty, searchParams.isMedia]);

  return { status, fetch };
};
