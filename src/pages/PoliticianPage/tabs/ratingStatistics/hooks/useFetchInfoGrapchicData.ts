import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { politicianAPI } from 'src/api/politicianAPI';
import { APIStatus } from 'src/lib/axiosAPI';
import { politicianActionCreators } from '../../../../../slices/politicianSlice';

export const useFetchInfoGrapchicData = () => {
  const [statusCountries, setStatusCountries] = useState<APIStatus>(APIStatus.Initial);
  const [statusRegions, setStatusRegions] = useState<APIStatus>(APIStatus.Initial);
  const [statusCities, setStatusCities] = useState<APIStatus>(APIStatus.Initial);
  const { fetchCountries, fetchRegions, fetchCities } = politicianAPI();
  const { setCountries, setCities, setRegions } = politicianActionCreators();

  const fetchCountry = useCallback(() => {
    setStatusCountries(APIStatus.Loading);
    fetchCountries({
      onError: () => setStatusCountries(APIStatus.Failure),
      onSuccess: (response) => {
        setCountries(response);
        setStatusCountries(APIStatus.Success);
      },
    });
  }, []);

  const fetchRegion = useCallback((array) => {
    setStatusRegions(APIStatus.Loading);
    fetchRegions({
      onError: () => setStatusRegions(APIStatus.Failure),
      onSuccess: (response) => {
        setRegions(response);
        setStatusRegions(APIStatus.Success);
      },
      payload: {
        data: {
          countries: array,
        },
      },
    });
  }, []);

  const fetchCity = useCallback((array) => {
    setStatusCities(APIStatus.Loading);
    fetchCities({
      onError: () => setStatusCities(APIStatus.Failure),
      onSuccess: (response) => {
        setCities(response);
        setStatusCities(APIStatus.Success);
      },
      payload: {
        data: {
          regions: array,
        },
      },
    });
  }, []);

  return { fetchCountry, fetchRegion, fetchCity, statusCountries, statusRegions, statusCities };
};
