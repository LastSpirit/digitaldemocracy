import { useCallback, useState } from 'react';
import { APIStatus } from 'src/lib/axiosAPI';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { ratingAPI } from '../../../api/ratingAPI';
import { ratingActionCreators } from '../../../slices/ratingSlice';

export const useFetchSort = () => {
  const [regionStatus, setRegionStatus] = useState(APIStatus.Initial);
  const [cityStatus, setCityStatus] = useState(APIStatus.Initial);

  const { getCountries, getRegions, getCities } = ratingAPI();
  const { setCountry, setCities, setRegions } = ratingActionCreators();

  const fetchCounties = useCallback(() => {
    getCountries({
      onSuccess: (response) => {
        setCountry(response);
      },
      onError: (errorResponse) => console.log(errorResponse),
    });
  }, []);

  const fetchRegions = useCallback((id: number) => {
    setRegionStatus(APIStatus.Loading);
    getRegions({
      onSuccess: (response) => {
        setRegionStatus(APIStatus.Success);
        setRegions(response);
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

  const fetchCities = useCallback((id) => {
    setCityStatus(APIStatus.Loading);
    getCities({
      onSuccess: (response) => {
        setCityStatus(APIStatus.Success);
        setCities(response);
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
