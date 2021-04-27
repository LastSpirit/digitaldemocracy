import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Autocomplete, Typography,
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useFetchAddresses } from './useFetchAddresses';
import { ModalParams } from '../../../types/routing';
import { useSearchParams } from '../../../hooks/useSearchParams';

const RegisterAmplify: FC = (props) => {
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const { register } = useAuth() as any;
  const { fetchAddresses, addresses: options } = useFetchAddresses();

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  return (
    <>
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
            await register(values.address);

            navigate('/authentication/verify-code', {
              state: {
                username: values.address
              }
            });
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
          isSubmitting,
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
              // getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={touched.address && errors.address}
                  label="Начните вводить город или улицу"
                  margin="normal"
                  name="address"
                  variant="outlined"
                  onChange={(value) => {
                    fetchAddresses(value.target.value);
                    handleChange(value);
                  }}
                />
              )}
              onBlur={handleBlur}
              value={values.address}
            />
            <Box sx={{ mt: 2 }}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Продолжить
              </Button>
            </Box>
            <Box sx={{ mt: 4, justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
              <Typography>
                Уже есть аккаунт?
              </Typography>
              <Button
                color="primary"
                size="medium"
                variant="outlined"
                onClick={() => setAuthValue('login')}
              >
                Войти
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegisterAmplify;
