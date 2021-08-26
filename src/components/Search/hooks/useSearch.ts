import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from 'src/lib/axiosAPI';
import { searchAPI } from 'src/api/searchAPI';
import { searchSelectors, searchActionCreators } from 'src/slices/searchSlice';

export const useSearch = () => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  // const searchParams = useSelector(searchSelectors.getSearchParams());
  const {
    setSearchData
  } = searchActionCreators();
  const { fetchSearch } = searchAPI();

  const fetchSearchCategory = ({
    search,
    isNews = true,
    isPolitician = true,
    isParty = true,
    isMedia = true,
    isAuthor = true,
    page = 1,
    perPage = 4
  }) => {
    setStatus(APIStatus.Loading);
    const paramAPI = {
      search,
      isNews,
      isPolitician,
      isParty,
      isMedia,
      isAuthor,
      page,
      perPage
    };
    fetchSearch({
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      onSuccess: (response) => {
        setSearchData(response);
        setStatus(APIStatus.Success);
      },
      payload: paramAPI
    });
  };

  return { status, fetchSearchCategory };
};