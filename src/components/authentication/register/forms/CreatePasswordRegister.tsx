import React, { useContext } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../../../contexts/AuthContext';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useRegister } from '../hooks/useRegister';

const CreatePasswordRegister = () => {
  const isMountedRef = useIsMountedRef();
  const { register } = useRegister();
  const { setRegisterStep } = useContext(AuthContext);
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          mt: 3
        }}
      >
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
            submit: null
          }}
          validationSchema={
                        Yup
                          .object()
                          .shape({
                            password: Yup
                              .string().required('Введите пароль').min(5, 'Минимальная длина пароля 5 символов'),
                            confirmPassword: Yup
                              .string().oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
                          })
                    }
          onSubmit={async (values, {
            setErrors,
            setStatus,
            setSubmitting,
          }): Promise<void> => {
            try {
              await register(values.password, setRegisterStep);
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
            handleChange,
            handleSubmit,
            values
          }): JSX.Element => (
            <form
              noValidate
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                helperText={errors.password}
                error={!!errors.password}
                value={values.password}
                onChange={handleChange}
                label="Придумайте пароль"
                variant="outlined"
                name="password"
                sx={{
                  mb: 2
                }}
              />
              <TextField
                fullWidth
                helperText={errors.confirmPassword}
                error={!!errors.confirmPassword}
                label="Введите пароль повторно"
                margin="normal"
                name="confirmPassword"
                variant="outlined"
                onChange={handleChange}
                value={values.confirmPassword}
              />
              <Box sx={{ mt: 3 }}>
                <Button
                  color="primary"
                  disabled={!values.password && !values.confirmPassword}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  ЗАДАТЬ ПАРОЛЬ
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default CreatePasswordRegister;
