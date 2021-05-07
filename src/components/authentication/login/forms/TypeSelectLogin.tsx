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
  const { sendCode, verifyEmail, emailError, phoneError } = useFirstStepLogin(setLoginStep);
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
              helperText={errors.email || emailError}
              value={values.email}
              onChange={handleChange}
              label="E-mail"
              variant="outlined"
              error={!!errors.email || !!emailError}
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
              helperText={errors.phone || phoneError}
              error={!!errors.phone || !!phoneError}
              label="+7 XXX XXX XX XX"
              margin="normal"
              name="phone"
              variant="outlined"
              onChange={handleChange}
              value={values.phone}
              InputProps={{
                endAdornment: <ArrowInputIcon
                  id="sign-in-button"
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
