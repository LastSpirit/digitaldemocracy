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
  const [update, setUpdate] = useState(true);
  const { fetchCounties, fetchRegions, fetchCities } = useFetchSort();
  const {
    setSortGeography,
    setSortVote,
    setCountryGeography,
    setCitiesGeography,
    setRegionsGeography,
    setCountryVote,
    setCitiesVote,
    setRegionsVote,
  } = ratingActionCreators();
  const { countries, cities, regions } = useSelector((s: RootState) => s.rating[field]);
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
    fetchCounties(field);
    if (field === 'geography') {
      if (postData.country_politician_id) {
        fetchRegions(postData.country_politician_id, field);
      }
      if (postData.region_politician_id) {
        fetchCities(postData.region_politician_id, field);
      }
    }
    if (field === 'vote') {
      if (postData2.country_user_id) {
        fetchRegions(postData2.country_user_id, field);
      }
      if (postData2.region_user_id) {
        fetchCities(postData2.region_user_id, field);
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
            style={{ width: '180px', marginRight: '15px', display: 'flex' }}
            className={styles.mainForm}
            onReset={handleReset}
            noValidate
          >
            <div style={{ marginRight: '5px' }}>
              <InputLabel htmlFor="country" className={styles.inputLabel}>
                {text}
              </InputLabel>
              <Autocomplete
                id="country"
                options={countries ?? []}
                value={values.country}
                style={{ width: '170px' }}
                getOptionLabel={(option: any) => option?.title?.ru || values.country}
                isOptionEqualToValue={(option, value) => option.title?.ru === value}
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
                      setRegionsGeography(false);
                      setCitiesGeography(false);
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
                      setRegionsVote(false);
                      setCitiesVote(false);
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
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} type="text" onBlur={handleBlur} fullWidth helperText={errors.country} />
                )}
              />
            </div>
            {regions ? (
              <div style={{ marginRight: '5px' }}>
                <InputLabel htmlFor="region" className={styles.inputLabel}>
                  По Регионам
                </InputLabel>
                <Autocomplete
                  id="region"
                  options={regions}
                  value={values.region}
                  style={{ width: '170px' }}
                  getOptionLabel={(option: any) => option?.title?.ru || values.region}
                  isOptionEqualToValue={(option, value) => option.title?.ru === value}
                  noOptionsText={<>Нет доступных вариантов</>}
                  onChange={(_, newValue) => {
                    if (newValue && newValue !== null) {
                      setFieldValue('region', newValue.title.ru);
                      if (field === 'geography') {
                        setPostData({ ...postData, region_politician_id: newValue.id, city_politician_id: null });
                      }
                      if (field === 'vote') {
                        setPostData2({ ...postData2, region_user_id: newValue.id });
                      }
                      setFieldValue('city', '');
                    } else {
                      setFieldValue('region', '');
                      setFieldValue('city', '');
                      if (field === 'geography') {
                        setPostData({ ...postData, region_politician_id: null, city_politician_id: null });
                        setCitiesGeography(false);
                      }
                      if (field === 'vote') {
                        setPostData2({ ...postData2, region_user_id: null, city_user_id: null });
                        setCitiesVote(false);
                      }
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
                  )}
                />
              </div>
            ) : null}
            {cities ? (
              <div style={{ marginRight: '5px' }}>
                <InputLabel htmlFor="city" className={styles.inputLabel}>
                  По Городам
                </InputLabel>
                <Autocomplete
                  id="city"
                  options={cities}
                  value={values.city}
                  style={{ width: '170px' }}
                  getOptionLabel={(option: any) => option?.title?.ru || values.city}
                  isOptionEqualToValue={(option, value) => option.title?.ru === value}
                  noOptionsText={<>Нет доступных вариантов</>}
                  onChange={(_, newValue) => {
                    if (newValue && newValue !== null) {
                      setFieldValue('city', newValue.title.ru);
                      if (field === 'geography') {
                        setPostData((prevState) => {
                          const newState = { ...prevState, city_politician_id: newValue.id };
                          setSortGeography(newState);
                          setUpdate(!update);
                          return newState;
                        });
                      }
                      if (field === 'vote') {
                        setPostData2((prevState) => {
                          const newState = { ...prevState, city_user_id: newValue.id };
                          setSortVote(newState);
                          setUpdate(!update);
                          return newState;
                        });
                      }
                    } else {
                      setFieldValue('city', '');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
                  )}
                />
              </div>
            ) : null}
          </form>
        );
      }}
    </Formik>
  );
};

export default SortDropdown;
