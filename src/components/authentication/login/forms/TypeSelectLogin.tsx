import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useFirstStepLogin } from '../hooks/useFirstStepLogin';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { ArrowInputIcon } from '../../common/ArrowInputIcon';
import { authActionCreators, authSelectors, AuthType } from '../../../../slices/authSlice';

const TypeSelectLogin = () => {
  const isMountedRef = useIsMountedRef();
  const { setAuthType, setLoginStep } = authActionCreators();
  const { sendCode, verifyEmail } = useFirstStepLogin(setLoginStep);
  const authType = useSelector(authSelectors.getAuthType());

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: 1
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
                      email: Yup
                        .string().email('Не правильный e-mail'),
                      phone: Yup
                        .number().typeError('Номер не может содержать буквы'),
                    })
              }
        onSubmit={async (values, {
          setErrors,
          setStatus,
          setSubmitting,
        }): Promise<void> => {
          try {
            const { phone, email } = values;
            if (authType === AuthType.Email) {
              await verifyEmail(email);
            } else {
              await sendCode(phone);
            }
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
            noValidate={false}
            onSubmit={handleSubmit}
          >
            <Typography
              color="#747373"
            >
              Вход через e-mail
            </Typography>
            <TextField
              fullWidth
              helperText={errors.email}
              value={values.email}
              onChange={handleChange}
              label="E-mail"
              variant="outlined"
              error={!!errors.email}
              name="email"
              InputProps={{
                endAdornment: <ArrowInputIcon
                  disable={!values.email || !!errors.email}
                  onClick={() => {
                    setAuthType(AuthType.Email);
                  }}
                />
              }}
            />
            <Box sx={{ mt: 2.5 }} />
            <Typography
              color="#747373"
              gutterBottom
            >
              Вход через смс
            </Typography>
            <TextField
              fullWidth
              helperText={errors.phone}
              error={!!errors.phone}
              label="+7 XXX XXX XX XX"
              margin="normal"
              name="phone"
              variant="outlined"
              onChange={handleChange}
              value={values.phone}
              InputProps={{
                endAdornment: <ArrowInputIcon
                  disable={!values.phone || !!errors.phone}
                  onClick={() => {
                    setAuthType(AuthType.Phone);
                  }}
                />
              }}
            />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default TypeSelectLogin;