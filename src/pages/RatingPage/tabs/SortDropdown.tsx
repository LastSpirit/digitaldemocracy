/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { InputLabel, Autocomplete } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import styles from '../../ChangeProfilePage/ChangeProfilePage.module.scss';
import { useFetchPoliticians } from '../hooks/useFetchPoliticians';
import { useFetchSort } from '../hooks/useFetchSort';
import { ratingActionCreators } from '../../../slices/ratingSlice';

export const SortDropdown = ({ text, field }) => {
  const { countries, cities, regions } = useSelector((s: RootState) => s.rating);

  const [update, setUpdate] = useState(true);
  const { fetchCounties, fetchRegions, fetchCities } = useFetchSort();
  const { setSortGeography, setSortVote, setCountry, setCities, setRegions } = ratingActionCreators();
  // TODO: исправляет данные
  const { fetch } = useFetchPoliticians();
  const [postData, setPostData] = useState({
    country_politician_id: null,
    region_politician_id: null,
    city_politician_id: null,
  });
  const [postData2, setPostData2] = useState({
    country_user_id: null,
    region_user_id: null,
    city_user_id: null,
  });

  useEffect(() => {
    fetchCounties();
    if (field === 'geography') {
      if (postData.country_politician_id) {
        fetchRegions(postData.country_politician_id);
      }
      if (postData.region_politician_id) {
        fetchCities(postData.region_politician_id);
      }
    }
    if (field === 'vote') {
      if (postData2.country_user_id) {
        fetchRegions(postData2.country_user_id);
      }
      if (postData2.region_user_id) {
        fetchCities(postData2.region_user_id);
      }
    }
  }, [
    postData.country_politician_id,
    postData.region_politician_id,
    postData2.region_user_id,
    postData2.country_user_id,
  ]);

  useEffect(() => {
    fetch();
  }, [update]);

  return (
    <Formik
      initialValues={{
        country: '',
        region: '',
        city: '',
      }}
      onSubmit={async () => {
        setPostData({ ...postData });
        try {
          await setUpdate(!update);
        } catch (e) {
          console.log(e);
        }
      }}
      enableReinitialize={true}
    >
      {(props) => {
        const { values, errors, handleChange, handleBlur, handleSubmit, handleReset, setFieldValue } = props;

        return (
          <form
            onSubmit={handleSubmit}
            style={{ width: '180px' }}
            className={styles.mainForm}
            onReset={handleReset}
            noValidate
          >
            <InputLabel htmlFor="country" className={styles.inputLabel}>
              Страна
            </InputLabel>
            <Autocomplete
              id="country"
              options={countries}
              value={values.country}
              getOptionLabel={(option: any) => option?.title?.ru || values.country}
              noOptionsText={<>Нет доступных вариантов</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('country', newValue.title.ru);
                  if (field === 'geography') {
                    setPostData({
                      ...postData,
                      country_politician_id: newValue.id,
                      region_politician_id: null,
                      city_politician_id: null,
                    });
                    setSortGeography(postData);
                    setUpdate(!update);
                    console.log(postData, 'postData');
                  }
                  if (field === 'vote') {
                    setPostData2({
                      ...postData2,
                      country_user_id: newValue.id,
                      region_user_id: null,
                      city_user_id: null,
                    });
                    setSortVote(postData2);
                    setUpdate(!update);
                  }
                  setFieldValue('region', '');
                } else {
                  if (field === 'geography') {
                    setPostData({
                      ...postData,
                      country_politician_id: null,
                      region_politician_id: null,
                      city_politician_id: null,
                    });
                    setSortGeography({
                      country_politician_id: null,
                      region_politician_id: null,
                      city_politician_id: null,
                    });
                    setUpdate(!update);
                  }
                  if (field === 'vote') {
                    setPostData2({
                      ...postData2,
                      country_user_id: null,
                      region_user_id: null,
                      city_user_id: null,
                    });
                    setSortVote({
                      country_user_id: null,
                      region_user_id: null,
                      city_user_id: null,
                    });
                    setUpdate(!update);
                  }
                  setFieldValue('country', '');
                  setFieldValue('region', '');
                  setFieldValue('city', '');
                  setRegions([]);
                  setCities([]);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} fullWidth helperText={errors.country} />
              )}
            />
            {regions[0] ? (
              <>
                <InputLabel htmlFor="region" className={styles.inputLabel}>
                  Регион
                </InputLabel>
                <Autocomplete
                  id="region"
                  options={regions}
                  value={values.region}
                  getOptionLabel={(option: any) => option?.title?.ru || values.region}
                  noOptionsText={<>Нет доступных вариантов</>}
                  onChange={(_, newValue) => {
                    if (newValue && newValue !== null) {
                      setFieldValue('region', newValue.title.ru);
                      if (field === 'geography') {
                        setPostData({ ...postData, region_politician_id: newValue.id, city_politician_id: null });
                        setUpdate(!update);
                      }
                      if (field === 'vote') {
                        setPostData2({ ...postData2, region_user_id: newValue.id });
                        setUpdate(!update);
                      }
                      setFieldValue('city', '');
                    } else {
                      setFieldValue('region', '');
                      setFieldValue('city', '');
                      if (field === 'geography') {
                        setPostData({ ...postData, region_politician_id: null, city_politician_id: null });
                      }
                      if (field === 'vote') {
                        setPostData2({ ...postData2, region_user_id: null, city_user_id: null });
                      }
                      // if (values.region === '') {
                      //   setRegions([]);
                      // }
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
                  )}
                />
              </>
            ) : null}
            {cities[0] ? (
              <>
                <InputLabel htmlFor="city" className={styles.inputLabel}>
                  Город
                </InputLabel>
                <Autocomplete
                  id="city"
                  limitTags={5}
                  options={cities}
                  value={values.city}
                  getOptionLabel={(option: any) => option?.title?.ru || values.city}
                  noOptionsText={<>Нет доступных вариантов</>}
                  onChange={(_, newValue) => {
                    if (newValue && newValue !== null) {
                      setFieldValue('city', newValue.title.ru);
                      if (field === 'geography') {
                        setPostData({ ...postData, city_politician_id: newValue.id });
                        setSortGeography(postData);
                        setUpdate(!update);
                      }
                      if (field === 'vote') {
                        setPostData2({ ...postData2, city_user_id: newValue.id });
                        setSortVote(postData2);
                        setUpdate(!update);
                      }
                    } else {
                      setFieldValue('city', '');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
                  )}
                />
              </>
            ) : null}
          </form>
        );
      }}
    </Formik>
  );
};

export default SortDropdown;
