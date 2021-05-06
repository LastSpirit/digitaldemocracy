import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Autocomplete, Box, Button, TextField, Typography } from '@material-ui/core';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useFetchAddresses } from '../hooks/useFetchAddresses';
import { useCheckAddress } from '../hooks/useCheckAddress';
import { authActionCreators } from '../../../../slices/authSlice';
import { APIStatus } from '../../../../lib/axiosAPI';

const AddressFormRegister: FC = (props) => {
  const isMountedRef = useIsMountedRef();
  const { fetchAddresses, addresses: options } = useFetchAddresses();
  const { setRegisterStep } = authActionCreators();
  const { check, status, error } = useCheckAddress(setRegisterStep);

  return (
    <>
      <Typography
        color="#747373"
        gutterBottom
      >
        Где вы имеете право голоса?
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          mt: 3
        }}
      >
        <Formik
          initialValues={{
            address: '',
            submit: null
          }}
          validationSchema={
          Yup
            .object()
            .shape({
              address: Yup
                .string()
                .required('Это обязательное поле'),
            })
        }
          onSubmit={async (values, {
            setErrors,
            setStatus,
            setSubmitting
          }): Promise<void> => {
            try {
              await check();
            } catch (err) {
              console.error(err);
              if (isMountedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values
          }): JSX.Element => (
            <form
              noValidate
              onSubmit={handleSubmit}
              {...props}
            >
              <Autocomplete
                fullWidth
                options={options || []}
                noOptionsText={<>Нет доступных вариантов</>}
                onInputChange={(value, newValue) => {
                  fetchAddresses(newValue);
                  handleChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
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
              <Box sx={{ mt: 2 }}>
                <Button
                  color="primary"
                  disabled={!values.address || status === APIStatus.Loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Продолжить
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
