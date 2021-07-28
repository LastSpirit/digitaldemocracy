/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { APIStatus } from 'src/lib/axiosAPI';
import { Loading } from 'src/components/Loading/Loading';
import { Formik } from 'formik';
import { Button, InputLabel, Autocomplete, TextField } from '@material-ui/core';
import { RootState } from 'src/store';
import { politicianSelectors } from 'src/slices/politicianSlice';
import { PercentsLinearGraphic } from './PercentsLinearGraphic';
import { useFetchInfoGrapchicData } from '../../hooks/useFetchInfoGrapchicData';
import styles from './InfoGraphic.module.scss';

export const InfoGraphic = () => {
  const { isMobile } = useWindowSize();
  const { statusCities, statusRegions, fetchCity, fetchRegion } = useFetchInfoGrapchicData();

  const { infoGrapghicData } = useSelector((s: RootState) => s.politician);
  const data = useSelector(politicianSelectors.getPoliticianInfo());

  const [postData, setPostData] = useState({
    country: null,
    region: null,
    city: null,
  });

  useEffect(() => {
    if (postData.country) {
      fetchRegion(postData.country);
    }
  }, [postData.country]);

  useEffect(() => {
    if (postData.region) {
      fetchCity(postData.region);
    }
  }, [postData.region]);

  return (
    <div className={styles.root}>
      <Formik
        initialValues={{
          country: [],
          region: [],
          city: [],
        }}
        onSubmit={async (values) => {
          // const { name, lastname, day } = values;
          // setPostData({ ...postData, name, lastname, day });
          try {
            console.log(values);
          } catch (e) {
            console.log(e);
          }
        }}
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
              <InputLabel htmlFor="country" className={styles.inputLabel}>
                Страна
              </InputLabel>
              <Autocomplete
                id="country"
                multiple
                limitTags={isMobile ? 2 : 5}
                filterSelectedOptions
                options={infoGrapghicData?.countries || []}
                value={values.country}
                getOptionLabel={(option) => option?.title || values.country}
                noOptionsText={<>Нет доступных вариантов</>}
                onChange={(_, newValue) => {
                  if (newValue.length > 0 && newValue !== (null && undefined)) {
                    const items = [];
                    newValue.map((item) => items.push(item));
                    setFieldValue('country', items);
                    setFieldValue('region', []);
                    setFieldValue('city', []);
                    setPostData({ ...postData, country: items });
                  } else {
                    setFieldValue('country', []);
                    setFieldValue('region', []);
                    setFieldValue('city', []);
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
                multiple
                limitTags={isMobile ? 2 : 5}
                filterSelectedOptions
                options={infoGrapghicData?.regions || []}
                disabled={!values.country || statusRegions !== APIStatus.Success ? true : false}
                value={values.region}
                getOptionLabel={(option) => option?.title || values.region}
                noOptionsText={<>Нет доступных вариантов</>}
                onChange={(_, newValue) => {
                  if (newValue.length > 0 && newValue !== (null && undefined)) {
                    const items = [];
                    newValue.map((item) => items.push(item));
                    setFieldValue('region', items);
                    setFieldValue('city', []);
                    setPostData({ ...postData, region: items });
                  } else {
                    setFieldValue('region', []);
                    setFieldValue('city', []);
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
                multiple
                limitTags={isMobile ? 2 : 5}
                filterSelectedOptions
                options={infoGrapghicData?.cities || []}
                value={values.city}
                disabled={!values.region || statusCities !== APIStatus.Success ? true : false}
                getOptionLabel={(option) => option?.title || values.city}
                noOptionsText={<>Нет доступных вариантов</>}
                onChange={(_, newValue) => {
                  if (newValue.length > 0 && newValue !== (null && undefined)) {
                    const items = [];
                    newValue.map((item) => items.push(item));
                    setFieldValue('city', items);
                    setPostData({ ...postData, city: items });
                  } else {
                    setFieldValue('city', []);
                    setPostData({ ...postData, city: null });
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
                  {/* {statusPOST === APIStatus.Loading ? <Loading color="white" /> : 'Подтвердить изменения'} */}
                  {isMobile ? 'Подтвердить' : 'Подтвердить изменения'}
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
                  {isMobile ? 'Сбросить' : 'Сбросить введенные данныe'}
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
      <div className={styles.retingWrapper}>
        {data?.rating && <div className={styles.percent}>{data?.rating} %</div>}
        <div className={styles.linear}>{data?.rating && <PercentsLinearGraphic vote_groups={data?.vote_groups} />}</div>
      </div>
    </div>
  );
};
