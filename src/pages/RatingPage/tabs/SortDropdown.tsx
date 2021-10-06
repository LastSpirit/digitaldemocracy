/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputLabel, Autocomplete, Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { Formik } from 'formik';
import styles from './Tabs.module.scss';
import { useFetchPoliticians } from '../hooks/useFetchPoliticians';
import { useFetchSort } from '../hooks/useFetchSort';
import { ratingActionCreators } from '../../../slices/ratingSlice';

export const SortDropdown = ({ text, field, world }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
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
  const { sort_vote, sort_geography } = useSelector((s: RootState) => s.rating);

  const [postData, setPostData] = useState({
    country_politician_idArray: null,
    region_politician_idArray: null,
    city_politician_idArray: null,
  });

  const [postData2, setPostData2] = useState({
    country_user_id: null,
    region_user_id: null,
    city_user_id: null,
  });

  // console.log(postData);

  useEffect(() => {
    fetch(world);
  }, [update, world]);

  useEffect(() => {
    fetchCounties(field);
    if (field === 'geography') {
      if (postData.country_politician_idArray) {
        fetchRegions(postData.country_politician_idArray, field);
      }
      if (postData.region_politician_idArray) {
        fetchCities(postData.region_politician_idArray, field);
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
    postData.country_politician_idArray,
    postData.region_politician_idArray,
    postData2.region_user_id,
    postData2.country_user_id,
  ]);

  return !world ? (
    <Formik
      key={world}
      initialValues={{
        country: [],
        region: '',
        city: '',
      }}
      onSubmit={() => {
        setPostData(postData);
        setUpdate(!update);
      }}
      enableReinitialize={true}
    >
      {(props) => {
        const { values, errors, handleChange, handleBlur, handleSubmit, handleReset, setFieldValue } = props;
        return (
          <div className={styles.mainTitle}>
            {text}
            <form
              onSubmit={handleSubmit}
              style={{ width: '270px', marginRight: '15px' }}
              className={styles.mainForm}
              onReset={handleReset}
              noValidate
            >
              <div style={{ marginRight: '30px' }}>
                <InputLabel htmlFor="country" className={styles.inputLabel}>
                  {t('buttons.sort.countryFullTitle')}
                </InputLabel>
                <Autocomplete
                  multiple
                  id="country"
                  options={countries ?? []}
                  style={{ width: '292px' }}
                  getOptionLabel={(option: any) => option?.title?.[currentLang] || option?.title?.ru || values.country}
                  isOptionEqualToValue={(option, value) => {
                    return option.title?.[currentLang] === value || option.title?.ru === value;
                  }}
                  noOptionsText={<>{t('info.noVariants')}</>}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setFieldValue('country', newValue);
                      const newVal = newValue.map((i) => {
                        return { id: i.id };
                      });

                      if (field === 'geography') {
                        setPostData((prevState) => {
                          const newState = {
                            ...prevState,
                            country_politician_idArray: newVal,
                            region_politician_idArray: null,
                            city_politician_idArray: null,
                          };
                          setSortGeography(newState);
                          setUpdate(!update);
                          return newState;
                        });
                      }

                      if (field === 'vote') {
                        setPostData2((prevState) => {
                          const newState = {
                            ...prevState,
                            // country_user_id: newValue.id,
                            region_user_id: null,
                            city_user_id: null,
                          };
                          setSortVote(newState);
                          setUpdate(!update);
                          return newState;
                        });
                      }
                      setFieldValue('region', '');
                    } else {
                      if (field === 'geography') {
                        setPostData({
                          ...postData,
                          country_politician_idArray: null,
                          region_politician_idArray: null,
                          city_politician_idArray: null,
                        });
                        setRegionsGeography(false);
                        setCitiesGeography(false);
                        setSortGeography({
                          country_politician_idArray: null,
                          region_politician_idArray: null,
                          city_politician_idArray: null,
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
                <div style={{ marginRight: '30px' }}>
                  <InputLabel htmlFor="region" className={styles.inputLabel}>
                    {t('buttons.sort.regionFullTitle')}
                  </InputLabel>
                  <Autocomplete
                    multiple
                    id="region"
                    options={regions}
                    // value={values.region}
                    style={{ width: '292px' }}
                    getOptionLabel={(option: any) => option?.title?.[currentLang] || option?.title?.ru || values.region}
                    isOptionEqualToValue={(option, value) => {
                      return option.title?.[currentLang] === value || option.title?.ru === value;
                    }}
                    noOptionsText={<>{t('info.noVariants')}</>}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        setFieldValue('region', newValue);
                        const newVal = newValue.map((i) => {
                          return { id: i.id };
                        });
                        if (field === 'geography') {
                          setPostData((prevState) => {
                            const newState = {
                              ...prevState,
                              region_politician_idArray: newVal,
                              city_politician_idArray: null,
                            };
                            setSortGeography(newState);
                            setUpdate(!update);
                            return newState;
                          });
                        }
                        if (field === 'vote') {
                          // setPostData2((prevState) => {
                            // const newState = { ...prevState, region_user_id: newValue.id, city_user_id: null };
                            // setSortVote(newState);
                            // setUpdate(!update);
                            // return newState;
                          // });
                        }
                        setFieldValue('city', '');
                      } else {
                        setFieldValue('region', '');
                        setFieldValue('city', '');
                        if (field === 'geography') {
                          setPostData({ ...postData, region_politician_idArray: null, city_politician_idArray: null });
                          setCitiesGeography(false);
                          setUpdate(!update);

                          setSortGeography({
                            region_politician_idArray: null,
                          });
                        }
                        if (field === 'vote') {
                          setPostData2({ ...postData2, region_user_id: null, city_user_id: null });
                          setCitiesVote(false);
                          setUpdate(!update);

                          setSortVote({
                            region_user_id: null,
                          });
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
                    {t('buttons.sort.citiesFullTitle')}
                  </InputLabel>
                  <Autocomplete
                    multiple
                    id="city"
                    options={cities}
                    // value={values.city}
                    style={{ width: '292px' }}
                    getOptionLabel={(option: any) => option?.title?.[currentLang] || option?.title?.ru || values.city}
                    isOptionEqualToValue={(option, value) => {
                      return option.title?.[currentLang] === value || option.title?.ru === value;
                    }}
                    noOptionsText={<>{t('info.noVariants')}</>}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        // setFieldValue('city', newValue.title?.[currentLang] || newValue.title?.ru);
                        if (field === 'geography') {
                          setPostData((prevState) => {
                            const newState = { ...prevState, city_politician_idArray: newValue };
                            setSortGeography(newState);
                            setUpdate(!update);
                            return newState;
                          });
                        }
                        if (field === 'vote') {
                          // setPostData2((prevState) => {
                            // const newState = { ...prevState, city_user_id: newValue.id };
                            // setSortVote(newState);
                            // setUpdate(!update);
                            // return newState;
                          // });
                        }
                      } else {
                        if (field === 'geography') {
                          setSortGeography({
                            city_politician_idArray: null,
                          });
                        } else {
                          setSortVote({
                            city_user_id: null,
                          });
                        }
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
            <div className={styles.worldCheckbox}>
              <Checkbox
                icon={<CircleUnchecked style={{ color: 'black' }} />}
                checkedIcon={<RadioButtonCheckedIcon style={{ color: 'black' }} />}
                value={world}
                // onChange={() => {
                //   resetFilterForGeography();
                //   setWorld(!world);
                // }}
              />
              <p>{t('info.worldUser')}</p>
            </div>
          </div>
        );
      }}
    </Formik>
  ) : null;
};

export default SortDropdown;
