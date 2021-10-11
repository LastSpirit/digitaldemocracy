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

export const SortDropdown = ({ text, field, world, setWorld, update, setUpdate, worldVotes, setWorldVotes }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { fetchCountries, fetchRegions, fetchCities } = useFetchSort();
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
    country_user_idArray: null,
    region_user_idArray: null,
    city_user_idArray: null,
  });

  const clearValue = (key, setValue) => {
    setValue(key, []);
  };

  useEffect(() => {
    fetchCountries(field);
    if (field === 'geography') {
      if (postData.country_politician_idArray && postData.country_politician_idArray.length) {
        setWorld(false);
        fetchRegions(postData.country_politician_idArray, field);
        if (postData.region_politician_idArray && postData.region_politician_idArray.length) {
          fetchCities(postData.region_politician_idArray, field);
        } else {
          setCitiesGeography(null);
        }
      } else {
        setPostData((prevState) => {
          const newState = {
            ...prevState,
            country_politician_idArray: null,
            region_politician_idArray: null,
            city_politician_idArray: null,
          };
          setSortGeography(newState);
          setRegionsGeography(null);
          setCitiesGeography(null);
          setWorld(true);
          return newState;
        });
      }
    }

    if (field === 'vote') {
      if (postData2.country_user_idArray && postData2.country_user_idArray.length) {
        setWorldVotes(false);
        fetchRegions(postData2.country_user_idArray, field);
      }
      if (postData2.region_user_idArray && postData2.region_user_idArray.length) {
        fetchCities(postData2.region_user_idArray, field);
      }
    } else {
      setPostData2((prevState) => {
        const newState = {
          ...prevState,
          country_user_idArray: null,
          region_user_idArray: null,
          city_user_idArray: null,
        };
        setSortGeography(newState);
        setRegionsVote(null);
        setCitiesVote(null);
        return newState;
      });
    }
    setUpdate(!update);
  }, [
    postData.country_politician_idArray,
    postData.region_politician_idArray,
    postData.city_politician_idArray,
    postData2.region_user_idArray,
    postData2.country_user_idArray,
    postData2.city_user_idArray,
  ]);

  return (
    <Formik
      initialValues={{
        country: [],
        region: [],
        city: [],
      }}
      onSubmit={() => {
        setPostData(postData);
      }}
      enableReinitialize={true}
    >
      {(props) => {
        const { values, errors, handleChange, handleBlur, handleSubmit, handleReset, setFieldValue } = props;

        useEffect(() => {
          const newValueCity = [];
          const newValueRegion = [];
          if (values.country.length) {
            values.country.forEach((item) => {
              values.region.forEach((i) => {
                if (item.id === i.country_id) {
                  newValueRegion.push(i);
                }
              });
            });
          }
          if (values.country.length) {
            values.country.forEach((item) => {
              values.city.forEach((i) => {
                if (item.id === i.country_id) {
                  newValueCity.push(i);
                }
              });
            });
          }
          setFieldValue('region', newValueRegion);
          setFieldValue('city', newValueCity);
        }, [values.country]);

        useEffect(() => {
          const newValue = [];
          if (values.region.length) {
            values.region.forEach((item) => {
              values.city.forEach((i) => {
                if (item.id === i.region_id) {
                  newValue.push(i);
                }
              });
            });
          }
          setFieldValue('city', newValue);
        }, [values.region]);

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
                  value={values.country}
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
                            country_politician_idArray: newVal.length ? newVal : null,
                          };
                          setSortGeography(newState);
                          return newState;
                        });
                      }

                      if (field === 'vote') {
                        setPostData2((prevState) => {
                          const newState = {
                            ...prevState,
                            country_user_idArray: newVal.length ? newVal : null,
                          };
                          setSortVote(newState);
                          return newState;
                        });
                      }
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
                    value={values.region}
                    multiple
                    id="region"
                    options={regions}
                    style={{ width: '292px' }}
                    getOptionLabel={(option: any) => option?.title?.[currentLang] || option?.title?.ru || values.region}
                    isOptionEqualToValue={(option, value) => {
                      return option.title?.[currentLang] === value || option.title?.ru === value;
                    }}
                    noOptionsText={<>{t('info.noVariants')}</>}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        console.log(newValue);
                        setFieldValue('region', newValue);
                        const newVal = newValue.map((i) => {
                          return { id: i.id };
                        });
                        if (field === 'geography') {
                          setPostData((prevState) => {
                            const newState = {
                              ...prevState,
                              region_politician_idArray: newVal.length ? newVal : null,
                            };
                            setSortGeography(newState);
                            return newState;
                          });
                        }
                        if (field === 'vote') {
                          setPostData2((prevState) => {
                            const newState = {
                              ...prevState,
                              region_user_idArray: newVal.length ? newVal : null,
                            };
                            setSortVote(newState);
                            return newState;
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
                    value={values.city}
                    multiple
                    id="city"
                    options={cities}
                    style={{ width: '292px' }}
                    getOptionLabel={(option: any) => option?.title?.[currentLang] || option?.title?.ru || values.city}
                    isOptionEqualToValue={(option, value) => {
                      return option.title?.[currentLang] === value || option.title?.ru === value;
                    }}
                    noOptionsText={<>{t('info.noVariants')}</>}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        setFieldValue('city', newValue);
                        const newVal = newValue.map((i) => {
                          return { id: i.id };
                        });
                        if (field === 'geography') {
                          setPostData((prevState) => {
                            const newState = {
                              ...prevState,
                              city_politician_idArray: newVal
                            };
                            setSortGeography(newState);
                            return newState;
                          });
                        }
                        if (field === 'vote') {
                          setPostData2((prevState) => {
                            const newState = {
                              ...prevState,
                              city_user_idArray: newVal
                            };
                            setSortVote(newState);
                            return newState;
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
            </form>
            <div className={styles.worldCheckbox}>
              <Checkbox
                icon={<CircleUnchecked style={{ color: 'black' }} />}
                checkedIcon={<RadioButtonCheckedIcon style={{ color: 'black' }} />}
                checked={field === 'geography' ? world : worldVotes}
                onChange={() => {
                  clearValue('country', setFieldValue);
                  if (field === 'geography') {
                    setPostData((prevState) => {
                      const newState = {
                        ...prevState,
                        country_politician_idArray: null,
                        region_politician_idArray: null,
                        city_politician_idArray: null,
                      };
                      setSortGeography(newState);
                      setWorld(true);
                      return newState;
                    });
                  } else {
                    setPostData((prevState) => {
                      const newState = {
                        ...prevState,
                        country_user_idArray: null,
                        region_user_idArray: null,
                        city_user_idArray: null,
                      };
                      setSortVote(newState);
                      setWorldVotes(true);
                      return newState;
                    });
                  }
                }}
              />
              <p>{t('info.worldUser')}</p>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default SortDropdown;
