import React from 'react';
import { Box, Button, Switch, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useLogin } from '../hooks/useLogin';
import { authSelectors, AuthType } from '../../../../slices/authSlice';
import { recaptchaConfig } from '../../../../config';

const ConfirmPasswordLogin = () => {
  const isMountedRef = useIsMountedRef();
  const { passwordVerify, codeVerify, error } = useLogin();
  const { rememberMe, authType } = useSelector(authSelectors.getAllData());
  const loginThroughEmail = authType === AuthType.Email;

  const onChangeRecaptcha = (value) => {
    console.log('Captcha value:', value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: 3
      }}
    >
      <Formik
        initialValues={{
          password: '',
          submit: null,
          code: '',
          rememberMe
        }}
        onSubmit={async (values, {
          setErrors,
          setStatus,
          setSubmitting,
        }): Promise<void> => {
          try {
            if (loginThroughEmail) {
              await passwordVerify(values.password, values.rememberMe);
            } else {
              await codeVerify(values.code);
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
              helperText={error}
              error={!!error}
              value={loginThroughEmail ? values.password : values.code}
              onChange={handleChange}
              label={loginThroughEmail ? 'Пароль' : 'Код из смс'}
              variant="outlined"
              name={loginThroughEmail ? 'password' : 'code'}
              sx={{
                mb: 2
              }}
            />
            <Box>
              {false && (
              <ReCAPTCHA
                sitekey={recaptchaConfig.siteKey}
                onChange={onChangeRecaptcha}
              />
              )}
              {loginThroughEmail && (
              <Box sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              >
                <Typography sx={{
                  paddingBottom: '0!important'
                }}
                >
                  Запомнить меня
                </Typography>
                <Switch
                  color="primary"
                  value={values.rememberMe}
                  name="rememberMe"
                  onChange={handleChange}
                />
              </Box>
              )}
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button
                color="primary"
                disabled={loginThroughEmail ? !values.password : !values.code}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                ВОЙТИ
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ConfirmPasswordLogin;
