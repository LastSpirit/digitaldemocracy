import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from 'src/lib/axiosAPI';
import { searchAPI } from 'src/api/searchAPI';
import { searchSelectors, searchActionCreators } from 'src/slices/searchSlice';

export const useSearchCategory = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  // const searchParams = useSelector(searchSelectors.getSearchParams());
  const {
    setSearchDataCategory
  } = searchActionCreators();
  const {
    fetchSearchNews,
    fetchSearchPolitician,
    fetchSearchAuthor,
    fetchSearchMedia,
    fetchSearchParty
  } = searchAPI();

  const fetchSearchNewsBlock = ({
    search,
    page = 1,
    perPage = 4
  }) => {
    setStatus(APIStatus.Loading);
    const paramAPI = {
      search,
      page,
      perPage
    };
    fetchSearchNews({
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      onSuccess: (response) => {
        setSearchDataCategory({
          key: 'news',
          ...response,
        });
        setStatus(APIStatus.Success);
      },
      payload: paramAPI
    });
  };

  return { status, fetchSearchNewsBlock };
};
