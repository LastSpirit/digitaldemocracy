import React from 'react';
import { Box, InputAdornment, TextField, Typography, FilledInput, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import './RegisterStyles.css';

const TypeRegisterSelect = () => {
  const isMountedRef = useIsMountedRef();
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
            email: '',
            phone: '',
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
              // await checkAddress(values.address);
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
            touched,
            values
          }): JSX.Element => (
            <form
              noValidate
              onSubmit={handleSubmit}
            >
              <Typography
                color="#747373"
              >
                Регистрация через e-mail
              </Typography>
              <FilledInput
                fullWidth
                inputComponent={() => (
                  <TextField
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    label="E-mail"
                    variant="outlined"
                    name="email"
                  />
                )}
                endAdornment={(
                  <InputAdornment
                    position="end"
                  >
                    <Button
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 10,
                      }}
                      disabled={!values.email}
                      type="submit"
                    >
                      <ArrowForwardIcon />
                    </Button>
                  </InputAdornment>
                )}
              />
              <Box sx={{ mt: 2.5 }} />
              <Typography
                color="#747373"
                gutterBottom
              >
                Регистрация через смс
              </Typography>
              <FilledInput
                fullWidth
                inputComponent={() => (
                  <TextField
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="+7 XXX XXX XX XX"
                    margin="normal"
                    name="phone"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.phone}
                  />
                )}
                endAdornment={(
                  <InputAdornment
                    position="end"
                  >
                    <Button
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 10,
                      }}
                      disabled={!values.email}
                      type="submit"
                    >
                      <ArrowForwardIcon />
                    </Button>
                  </InputAdornment>
                    )}
              />
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default TypeRegisterSelect;
