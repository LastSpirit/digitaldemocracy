import { useCallback, useState } from 'react';
import { APIStatus } from 'src/lib/axiosAPI';
import { ratingAPI } from '../../../api/ratingAPI';

export const useFetchSort = () => {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [regionStatus, setRegionStatus] = useState(APIStatus.Initial);
  const [cityStatus, setCityStatus] = useState(APIStatus.Initial);

  const { getCountries, getRegions, getCities, } = ratingAPI();

  const fetchCounties = useCallback(() => {
    getCountries({
      onSuccess: (response) => {
        setCountries(response);
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
    countries,
    regions,
    regionStatus,
    cities,
    cityStatus,
  };
};
