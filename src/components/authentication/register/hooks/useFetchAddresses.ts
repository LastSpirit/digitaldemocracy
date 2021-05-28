import { useCallback, useState } from 'react';
import { dadataConfig } from '../../../../config';
import { authAPI } from '../../../../api/authAPI';

export const useFetchAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [countries, setCountries] = useState([]);
  const { getCountries } = authAPI();

  const fetchAddresses = (query: string) => {
    const options = {
      method: 'POST',
      mode: 'cors' as RequestMode,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${dadataConfig.apiKey}`
      },
      body: JSON.stringify({ query })
    };

    fetch(dadataConfig.getAddresses, options)
      .then((response) => response.json())
      .then((result) => {
        setAddresses(result.suggestions.map((item) => item.value));
      })
      .catch((error) => console.log('error', error));
  };

  const fetchCounties = useCallback(() => {
    getCountries({
      onSuccess: (response) => setCountries(response),
      onError: (errorResponse) => console.log(errorResponse),
    });
  }, []);

  return {
    fetchAddresses,
    fetchCounties,
    addresses,
    countries,
  };
};
