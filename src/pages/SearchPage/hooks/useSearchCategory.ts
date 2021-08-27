import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from 'src/lib/axiosAPI';
import { searchAPI } from 'src/api/searchAPI';
import { searchSelectors, searchActionCreators } from 'src/slices/searchSlice';
import { SearchBlockTypes } from '../SearchBlock/SearchBlock';
import { useSearchParams } from '../../../hooks/useSearchParams';

export const useSearchCategory = (type) => {
  const [status, setStatus] = useState<APIStatus>(APIStatus.Initial);
  const searchQuery = useSelector(searchSelectors.getSearchQuery());
  // const { searchQuery: { value: searchQueryParam, setValue: setSearchQueryParam } } = useSearchParams('searchQuery');
  const {
    setSearchDataCategory,
  } = searchActionCreators();
  const {
    fetchSearchNews,
    fetchSearchPolitician,
    fetchSearchAuthor,
    fetchSearchMedia,
    fetchSearchParty
  } = searchAPI();

  // console.log(searchQueryParam);

  const fetchSearchBlock = ({
    page = 1,
    perPage = 4
  }) => {
    setStatus(APIStatus.Loading);
    const paramAPI = {
      search: searchQuery,
      page,
      perPage
    };
    switch (type) {
    case SearchBlockTypes.NEWS:
      fetchSearchNews({
        onError: () => {
          setStatus(APIStatus.Failure);
        },
        onSuccess: (response) => {
          setSearchDataCategory({
            key: SearchBlockTypes.NEWS,
            ...response,
          });
          setStatus(APIStatus.Success);
        },
        payload: paramAPI
      });
      break;
    case SearchBlockTypes.POLITICIAN:
      fetchSearchPolitician({
        onError: () => {
          setStatus(APIStatus.Failure);
        },
        onSuccess: (response) => {
          setSearchDataCategory({
            key: SearchBlockTypes.POLITICIAN,
            ...response,
          });
          setStatus(APIStatus.Success);
        },
        payload: paramAPI
      });
      break;
    case SearchBlockTypes.AUTHOR:
      fetchSearchAuthor({
        onError: () => {
          setStatus(APIStatus.Failure);
        },
        onSuccess: (response) => {
          setSearchDataCategory({
            key: SearchBlockTypes.AUTHOR,
            ...response,
          });
          setStatus(APIStatus.Success);
        },
        payload: paramAPI
      });
      break;
    case SearchBlockTypes.MEDIA:
      fetchSearchMedia({
        onError: () => {
          setStatus(APIStatus.Failure);
        },
        onSuccess: (response) => {
          setSearchDataCategory({
            key: SearchBlockTypes.MEDIA,
            ...response,
          });
          setStatus(APIStatus.Success);
        },
        payload: paramAPI
      });
      break;
    case SearchBlockTypes.PARTY:
      fetchSearchParty({
        onError: () => {
          setStatus(APIStatus.Failure);
        },
        onSuccess: (response) => {
          setSearchDataCategory({
            key: SearchBlockTypes.PARTY,
            ...response,
          });
          setStatus(APIStatus.Success);
        },
        payload: paramAPI
      });
      break;
    default:
      break;
    }
  };

  // useEffect(() => {
  //   fetchSearchBlock({});
  // }, [searchQuery]);

  return {
    status,
    fetchSearchBlock,
  };
};
