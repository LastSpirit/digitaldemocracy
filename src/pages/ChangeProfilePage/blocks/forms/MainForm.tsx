/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, InputLabel, Autocomplete } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { profileActionCreators } from 'src/slices/profileSlice';
import { Loading } from 'src/components/Loading/Loading';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { APIStatus } from 'src/lib/axiosAPI';
import { useFetchProfileInfo } from '../../hooks/useFetchProfileInfo';
import styles from '../../ChangeProfilePage.module.scss';

export const MainForm = () => {
  const { data, religions, genders, countries, political_views, educations, cities, regions } = useSelector(
    (s: RootState) => s.profile
  );

  const { changeCountyId, changeRegionId } = profileActionCreators();

  const { statusCity, statusRegion, fetchRegionData, fetchCityData, sendEditData, statusPOST } = useFetchProfileInfo();

  const [postData, setPostData] = useState({
    name: data?.userProfile?.first_name ?? '',
    lastname: data?.userProfile?.last_name ?? '',
    day: data?.userProfile?.birth_date?.split('-')?.reverse()?.join('-') ?? '',
    gender: data?.userProfile?.gender_id?.id ?? null,
    country: data?.userProfile?.country_id?.id ?? null,
    region: data?.userProfile?.region_id?.id ?? null,
    city: data?.userProfile?.city_id?.id ?? null,
    religion: data?.userProfile?.religion_id?.id ?? null,
    education: data?.userProfile?.education_id?.id ?? null,
    political_views: data?.userProfile?.political_view_id?.id ?? null,
  });

  setLocale({
    string: {
      max: 'Указанное количество символов превышает 255',
    },
  });

  useEffect(() => {
    if (data?.userProfile?.country_id?.id) {
      fetchRegionData(data?.userProfile?.country_id?.id);
    }
  }, [data?.userProfile?.country_id?.id]);

  useEffect(() => {
    if (data?.userProfile?.region_id?.id) {
      fetchCityData(data?.userProfile?.region_id?.id);
    }
  }, [data?.userProfile?.region_id?.id]);

  return (
    <Formik
      initialValues={{
        name: data?.userProfile?.first_name ?? '',
        lastname: data?.userProfile?.last_name ?? '',
        day:
          data?.userProfile?.birth_date?.split('-')[0].length !== 4
            ? data?.userProfile?.birth_date?.split('-')?.reverse()?.join('-')
            : data?.userProfile?.birth_date ?? '',
        gender: data?.userProfile?.gender_id?.title ?? '',
        country: data?.userProfile?.country_id?.title ?? '',
        region: data?.userProfile?.region_id?.title ?? '',
        city: data?.userProfile?.city_id?.title ?? '',
        religion: data?.userProfile?.religion_id?.title ?? '',
        education: data?.userProfile?.education_id?.title ?? '',
        political_views: data?.userProfile?.political_view_id?.title ?? '',
      }}
      onSubmit={async (values) => {
        const { name, lastname, day } = values;
        setPostData({ ...postData, name, lastname, day });
        console.log(postData);
        try {
          await sendEditData(postData, name, lastname, day);
        } catch (e) {
          console.log(e);
        }
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255),
        lastname: Yup.string().max(255),
        day: Yup.date(),
        gender: Yup.string(),
        country: Yup.string().required('Это обязательное поле'),
        region: Yup.string(),
        city: Yup.string(),
        religion: Yup.string(),
        education: Yup.string(),
        political_views: Yup.string(),
      })}
      enableReinitialize={true}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          setFieldValue,
        } = props;
        const disabled = !!Object.entries(errors).length || !dirty;

        return (
          <form onSubmit={handleSubmit} className={styles.mainForm} onReset={handleReset} noValidate>
            <InputLabel htmlFor="name" className={styles.inputLabel}>
              Имя
            </InputLabel>
            <TextField
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />
            <InputLabel htmlFor="lastname" className={styles.inputLabel}>
              Фамилия
            </InputLabel>
            <TextField
              type="text"
              id="lastname"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />
            <div className={styles.multiInputs}>
              <div className={styles.rowInput}>
                <InputLabel htmlFor="day" className={styles.inputLabel}>
                  Дата рождения
                </InputLabel>
                <TextField
                  type="date"
                  id="day"
                  value={values.day}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.rowInput}>
                <InputLabel htmlFor="gender" className={styles.inputLabel}>
                  Пол
                </InputLabel>
                <Autocomplete
                  id="gender"
                  limitTags={10}
                  options={genders}
                  value={values.gender}
                  getOptionLabel={(option) => option?.title || values.gender}
                  isOptionEqualToValue={(option, value) => option.title === value}
                  noOptionsText={<>Нет доступных вариантов</>}
                  onChange={(_, newValue) => {
                    if (newValue && newValue !== null) {
                      setFieldValue('gender', newValue.title);
                      setPostData({ ...postData, gender: newValue.id });
                    } else {
                      setFieldValue('gender', '');
                      setPostData({ ...postData, gender: null });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
                  )}
                />
              </div>
            </div>
            <InputLabel htmlFor="country" className={styles.inputLabel}>
              Страна
            </InputLabel>
            <Autocomplete
              id="country"
              limitTags={5}
              options={countries}
              value={values.country}
              getOptionLabel={(option) => option?.title || values.country}
              isOptionEqualToValue={(option, value) => option.title === value}
              noOptionsText={<>Нет доступных вариантов</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('country', newValue.title);
                  changeCountyId(newValue.id);
                  setPostData({ ...postData, country: newValue.id, region: null, city: null });
                  setFieldValue('region', '');
                } else {
                  setFieldValue('country', '');
                  setFieldValue('region', '');
                  setPostData({ ...postData, country: null, region: null, city: null });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  helperText={errors.country}
                  error={!!errors.country}
                />
              )}
            />
            <InputLabel htmlFor="region" className={styles.inputLabel}>
              Регион
            </InputLabel>
            <Autocomplete
              id="region"
              limitTags={5}
              options={regions}
              disabled={!values.country || statusRegion !== APIStatus.Success ? true : false}
              value={values.region}
              getOptionLabel={(option) => option?.title || values.region}
              isOptionEqualToValue={(option, value) => option.title === value}
              noOptionsText={<>Нет доступных вариантов</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('region', newValue.title);
                  changeRegionId(newValue.id);
                  setPostData({ ...postData, region: newValue.id, city: null });
                  setFieldValue('city', '');
                } else {
                  setFieldValue('region', '');
                  setFieldValue('city', '');
                  setPostData({ ...postData, region: null, city: null });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
              )}
            />
            <InputLabel htmlFor="city" className={styles.inputLabel}>
              Город
            </InputLabel>
            <Autocomplete
              id="city"
              limitTags={5}
              options={cities}
              value={values.city}
              disabled={!values.region || statusCity !== APIStatus.Success ? true : false}
              getOptionLabel={(option) => option?.title || values.city}
              isOptionEqualToValue={(option, value) => option.title === value}
              noOptionsText={<>Нет доступных вариантов</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('city', newValue.title);
                  setPostData({ ...postData, city: newValue.id });
                } else {
                  setFieldValue('city', '');
                  setPostData({ ...postData, city: null });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
              )}
            />
            <InputLabel htmlFor="religion" className={styles.inputLabel}>
              Религиозные взгляды
            </InputLabel>
            <Autocomplete
              id="religion"
              limitTags={10}
              options={religions}
              value={values.religion}
              getOptionLabel={(option) => option?.title || values.religion}
              isOptionEqualToValue={(option, value) => option.title === value}
              noOptionsText={<>Нет доступных вариантов</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('religion', newValue.title);
                  setPostData({ ...postData, religion: newValue.id });
                } else {
                  setFieldValue('religion', '');
                  setPostData({ ...postData, religion: null });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
              )}
            />
            <InputLabel htmlFor="education" className={styles.inputLabel}>
              Образование
            </InputLabel>
            <Autocomplete
              id="education"
              limitTags={10}
              options={educations}
              value={values.education}
              getOptionLabel={(option) => option?.title || values.education}
              isOptionEqualToValue={(option, value) => option.title === value}
              noOptionsText={<>Нет доступных вариантов</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('education', newValue.title);
                  setPostData({ ...postData, education: newValue.id });
                } else {
                  setFieldValue('education', '');
                  setPostData({ ...postData, education: null });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
              )}
            />
            <InputLabel htmlFor="political_views" className={styles.inputLabel}>
              Политические взгляды
            </InputLabel>
            <Autocomplete
              id="political_views"
              limitTags={10}
              options={political_views}
              value={values.political_views}
              getOptionLabel={(option) => option?.title || values.political_views}
              isOptionEqualToValue={(option, value) => option.title === value}
              noOptionsText={<>Нет доступных вариантов</>}
              onChange={(_, newValue) => {
                if (newValue && newValue !== null) {
                  setFieldValue('political_views', newValue.title);
                  setPostData({ ...postData, political_views: newValue.id });
                } else {
                  setFieldValue('political_views', '');
                  setPostData({ ...postData, political_views: null });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} type="text" onBlur={handleBlur} variant="outlined" fullWidth />
              )}
            />
            <div className={styles.buttons}>
              <Button
                className={styles.submitButton}
                sx={{
                  p: 1,
                  paddingRight: 2,
                  paddingLeft: 2,
                  borderRadius: 100,
                  mr: 3,
                  textDecoration: 'none',
                }}
                size="small"
                variant="outlined"
                type="submit"
                disabled={!values.country ? true : false}
              >
                {statusPOST === APIStatus.Loading ? <Loading color="white" /> : 'Подтвердить изменения'}
              </Button>
              <Button
                className={styles.clearButton}
                sx={{
                  p: 1,
                  paddingRight: 2,
                  paddingLeft: 2,
                  borderRadius: 100,
                  mr: 3,
                  textDecoration: 'none',
                }}
                size="small"
                variant="outlined"
                type="reset"
              >
                Сбросить введенные данныe
              </Button>
            </div>
            {statusPOST === APIStatus.Success ? (
              <div className={styles.message} style={{ color: '#248232' }}>
                Данные были успешно обновлены!
              </div>
            ) : statusPOST === APIStatus.Failure ? (
              <div className={styles.message} style={{ color: 'red' }}>
                При отправке данных произошла ошибка!
              </div>
            ) : null}
          </form>
        );
      }}
    </Formik>
  );
};

export default MainForm;
