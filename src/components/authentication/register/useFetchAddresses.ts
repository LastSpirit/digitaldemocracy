import { useState } from 'react';
import { dadataConfig } from '../../../config';

export const useFetchAddresses = () => {
  const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  const token = dadataConfig.apiKey;
  const [addresses, setAddresses] = useState([]);
  const fetchAddresses = (query: string) => {
    const options = {
      method: 'POST',
      mode: 'cors' as RequestMode,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({ query })
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        setAddresses(result.suggestions.map((item) => item.value));
      })
      .catch((error) => console.log('error', error));
  };
  return {
    fetchAddresses,
    addresses,
  };
};
