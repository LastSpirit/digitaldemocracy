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
  const { fetchAddresses, addresses: options, countries, fetchCounties } = useFetchAddresses();
  const { setRegisterStep } = authActionCreators();
  const { check, status, error } = useCheckAddress(setRegisterStep);
  const [withCountry, setWithCountry] = useState(true);

  useEffect(() => {
    fetchCounties();
  }, []);

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
            address: '',
            country_id: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            address: Yup.string(),
            country_id: Yup.string(),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
            try {
              await check(values.address, values.country_id, withCountry, countries);
            } catch (err) {
              if (isMountedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }): JSX.Element => (
            <form noValidate onSubmit={handleSubmit} {...props}>
              <Box sx={{ mt: 0.5 }} style={{ marginBottom: !withCountry ? '20px' : '0px' }}>
                <Autocomplete
                  fullWidth
                  options={countries.map((item) => item.title) || []}
                  noOptionsText={<>Нет доступных вариантов</>}
                  onInputChange={(value, newValue) => {
                    if (newValue.toLowerCase() === 'россия' || newValue.toLowerCase() === 'российская федерация') {
                      setWithCountry(false);
                    } else {
                      setWithCountry(true);
                    }
                    handleChange(newValue);
                  }}
                  limitTags={15}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Начните вводить страну"
                      margin="normal"
                      name="country_id"
                      variant="outlined"
                      onSelect={(value) => {
                        handleChange(value);
                      }}
                      value={values.country_id}
                    />
                  )}
                  onBlur={handleBlur}
                  value={values.country_id}
                />
              </Box>
              {!withCountry && (
                <Autocomplete
                  disabled={withCountry}
                  fullWidth
                  options={options || []}
                  noOptionsText={<>Нет доступных вариантов</>}
                  onInputChange={(value, newValue) => {
                    fetchAddresses(newValue);
                    handleChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      disabled={withCountry}
                      {...params}
                      helperText={(touched.address && errors.address) || error}
                      error={(touched.address && !!errors.address) || !!error}
                      label="Начните вводить город или улицу"
                      margin="normal"
                      name="address"
                      variant="outlined"
                      onSelect={(value) => {
                        // @ts-ignore
                        fetchAddresses(value.target.defaultValue);
                        handleChange(value);
                      }}
                      value={values.address}
                    />
                  )}
                  onBlur={handleBlur}
                  value={values.address}
                />
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  color="primary"
                  disabled={(!values.address && !values.country_id) || status === APIStatus.Loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {status === APIStatus.Loading ? <Loading /> : 'Продолжить'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddressFormRegister;
