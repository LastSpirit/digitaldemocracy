import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  OutlinedInput,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useFetchAddresses } from '../hooks/useFetchAddresses';
import { useCheckAddress } from '../hooks/useCheckAddress';
import { authActionCreators } from '../../../../slices/authSlice';
import { APIStatus } from '../../../../lib/axiosAPI';
import { Loading } from '../../../Loading/Loading';

const AddressFormRegister: FC = (props) => {
  const isMountedRef = useIsMountedRef();
  const {
    fetchAddresses,
    addresses: options,
    countries,
    fetchCounties,
    fetchRegions,
    fetchCities,
    regions,
    regionStatus,
    cities,
    cityStatus,
  } = useFetchAddresses();
  const { setRegisterStep } = authActionCreators();
  const { check } = useCheckAddress(setRegisterStep);
  const [withCountry, setWithCountry] = useState(false);
  const [withRegion, setWithRegion] = useState(false);
  const [withCity, setWithCity] = useState(false);
  const isLoading = false;
  useEffect(() => {
    fetchCounties();
  }, []);
  const isButtonDisabled =
    (withCountry
      ? regions?.length !== 0
        ? withRegion
          ? cities?.length !== 0
            ? !withCity
            : false
          : true
        : false
      : true) ||
    regionStatus === APIStatus.Loading ||
    cityStatus === APIStatus.Loading;
  return (
    <>
      <Typography color="#747373" gutterBottom>
        Где вы имеете право голоса?
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          mt: 3,
        }}
      >
        <Formik
          initialValues={{
            country_title: '',
            region_title: '',
            city_title: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            country_title: Yup.string(),
            region_title: Yup.string(),
            city_title: Yup.string(),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
            try {
              await check({
                country_title: values?.country_title,
                region_title: values?.region_title,
                city_title: values?.city_title,
                countries,
                regions,
                cities,
                withCountry,
                withRegion,
                withCity,
              });
            } catch (err) {
              if (isMountedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }): JSX.Element => {
            return (
              <form noValidate onSubmit={handleSubmit} {...props}>
                <Box sx={{ mt: 0.5 }}>
                  <Autocomplete
                    fullWidth
                    options={countries.map((it) => it.title) || []}
                    noOptionsText={<>Нет доступных вариантов</>}
                    onSelect={(e) => {
                      handleChange(e);
                    }}
                    onInputChange={(value, newValue) => {
                      handleChange(newValue);
                      values.city_title = '';
                      values.region_title = '';
                      const isValidCountry = countries?.find(
                        (it) => it?.title?.toLowerCase() === newValue?.toLowerCase()
                      );
                      if (isValidCountry) {
                        fetchRegions(isValidCountry?.id);
                        setWithCountry(true);
                      } else {
                        setWithCountry(false);
                        setWithRegion(false);
                        setWithCity(false);
                      }
                    }}
                    limitTags={15}
                    disabled={cityStatus === APIStatus.Loading}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Начните вводить страну"
                        margin="normal"
                        name="country_title"
                        variant="outlined"
                        value={values.country_title}
                      />
                    )}
                    onBlur={handleBlur}
                    value={values.country_title}
                  />
                </Box>
                {withCountry && regions.length !== 0 && (
                  <Autocomplete
                    fullWidth
                    options={regions.map((item) => item.title) || []}
                    noOptionsText={<>Нет доступных вариантов</>}
                    onInputChange={(value, newValue) => {
                      handleChange(newValue);
                      values.city_title = '';
                      const isValidRegion = regions?.find((it) => it?.title?.toLowerCase() === newValue?.toLowerCase());
                      if (isValidRegion) {
                        fetchCities(isValidRegion.id);
                        setWithRegion(true);
                      } else {
                        setWithRegion(false);
                        setWithCity(false);
                      }
                    }}
                    disabled={regionStatus === APIStatus.Loading}
                    limitTags={15}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Начните вводить регион"
                        margin="normal"
                        name="region_title"
                        variant="outlined"
                        style={{ marginTop: '20px' }}
                        onSelect={(value) => {
                          handleChange(value);
                        }}
                        value={values.region_title}
                      />
                    )}
                    onBlur={handleBlur}
                    value={values.region_title}
                  />
                )}
                {withRegion && cities.length !== 0 && regions.length !== 0 && (
                  <Autocomplete
                    fullWidth
                    options={cities.map((item) => item.title) || []}
                    noOptionsText={<>Нет доступных вариантов</>}
                    onInputChange={(value, newValue) => {
                      const isValidCity = cities?.find((it) => it?.title?.toLowerCase() === newValue?.toLowerCase());
                      if (isValidCity) {
                        setWithCity(true);
                      } else {
                        setWithCity(false);
                      }
                      handleChange(newValue);
                    }}
                    disabled={cityStatus === APIStatus.Loading}
                    limitTags={15}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Начните вводить город"
                        margin="normal"
                        name="city_title"
                        variant="outlined"
                        style={{ marginTop: '20px' }}
                        onSelect={(value) => {
                          handleChange(value);
                        }}
                        value={values.city_title}
                      />
                    )}
                    onBlur={handleBlur}
                    value={values.city_title}
                  />
                )}

                <Box sx={{ mt: 2 }}>
                  <Button
                    color="primary"
                    disabled={isButtonDisabled}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isLoading ? <Loading /> : 'Продолжить'}
                  </Button>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default AddressFormRegister;
