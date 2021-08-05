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
  const [statusGrapchic, setStatusGraphic] = useState<APIStatus>(APIStatus.Initial);
  const { fetchCountries, fetchRegions, fetchCities, getPoliticianCustomRating } = politicianAPI();
  const { setCountries, setCities, setRegions, setRating, setVotesGroup } = politicianActionCreators();

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

  const fetchGraphic = useCallback((politician_id, obj) => {
    const { countries, regions, cities } = obj;
    setStatusGraphic(APIStatus.Loading);
    getPoliticianCustomRating({
      onError: () => setStatusGraphic(APIStatus.Failure),
      onSuccess: (response) => {
        setRating(response?.rating);
        setVotesGroup(response?.vote_groups);
        setStatusGraphic(APIStatus.Success);
      },
      payload: {
        data: {
          politician_id,
          countries,
          regions,
          cities,
        },
      },
    });
  }, []);

  return {
    fetchCountry,
    fetchRegion,
    fetchCity,
    fetchGraphic,
    statusCountries,
    statusRegions,
    statusCities,
    statusGrapchic,
  };
};