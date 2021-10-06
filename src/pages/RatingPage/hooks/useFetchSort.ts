import { useCallback, useState } from 'react';
import { APIStatus } from 'src/lib/axiosAPI';
import { ratingAPI } from '../../../api/ratingAPI';
import { ratingActionCreators } from '../../../slices/ratingSlice';

export const useFetchSort = () => {
  const [regionStatus, setRegionStatus] = useState(APIStatus.Initial);
  const [cityStatus, setCityStatus] = useState(APIStatus.Initial);

  const { getCountries, getRegions, getRegionsArray, getCities } = ratingAPI();
  const { setCountryGeography, setCitiesGeography, setRegionsGeography, setCountryVote, setCitiesVote, setRegionsVote } = ratingActionCreators();
  const fetchCounties = useCallback((field) => {
    getCountries({
      onSuccess: (response) => {
        if (field === 'geography') {
          setCountryGeography(response);
        } else if (field === 'vote') {
          setCountryVote(response);
        }
      },
      onError: (errorResponse) => console.log(errorResponse),
    });
  }, []);

  const fetchRegions = useCallback((id: number, field: string) => {
    setRegionStatus(APIStatus.Loading);
    getRegionsArray({
      onSuccess: (response) => {
        if (field === 'geography') {
          setRegionsGeography(response);
        } else if (field === 'vote') {
          setRegionsVote(response);
        }
      },
      onError: (errorResponse) => {
        setRegionStatus(APIStatus.Failure);
        console.log(errorResponse);
      },
      params: {
        country_id: id,
      },
    });
  }, []);

  const fetchCities = useCallback((id, field) => {
    setCityStatus(APIStatus.Loading);
    getCities({
      onSuccess: (response) => {
        if (field === 'geography') {
          setCitiesGeography(response);
        } else if (field === 'vote') {
          setCitiesVote(response);
        }
      },
      onError: (errorResponse) => {
        setCityStatus(APIStatus.Failure);
        console.log(errorResponse);
      },
      params: {
        region_id: id,
      },
    });
  }, []);

  return {
    fetchCounties,
    fetchRegions,
    fetchCities,
    regionStatus,
    cityStatus,
  };
};
