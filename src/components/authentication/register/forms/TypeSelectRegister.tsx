import React from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import '../RegisterStyles.css';
import { useSendCode } from '../hooks/useSendCode';
import { ArrowInputIcon } from '../../common/ArrowInputIcon';
import { authActionCreators, authSelectors, AuthType } from '../../../../slices/authSlice';
import { SingInSocialN, singInVariants } from '../../common/SingInVariants';
import { useOAuthRegister } from '../hooks/useOAuthRegister';

const TypeSelectRegister = () => {
  const isMountedRef = useIsMountedRef();
  const { setRegisterStep, setAuthType } = authActionCreators();
  const { send, error } = useSendCode(setRegisterStep);
  const registerType = useSelector(authSelectors.getAuthType());
  const { yandexOAuth } = useOAuthRegister();

  const handleSingInSocialN = (type: SingInSocialN) => {
    if (type === SingInSocialN.Yandex) {
      yandexOAuth();
    } else {
      console.log(SingInSocialN.Google);
    }
  };

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
              await send({ values: { phone, email }, registerType, setRegisterStep });
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
                Регистрация через e-mail
              </Typography>
              <TextField
                fullWidth
                helperText={errors.email || (registerType === AuthType.Email && error)}
                value={values.email}
                onChange={handleChange}
                label="E-mail"
                variant="outlined"
                error={!!errors.email || (registerType === AuthType.Email && !!error)}
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
                Регистрация через смс
              </Typography>
              <TextField
                fullWidth
                helperText={errors.phone || (registerType === AuthType.Phone && error)}
                error={!!errors.phone || (registerType === AuthType.Phone && !!error)}
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
          {singInVariants.map(({ type, title, Icon }, index) => (
            <Box
              onClick={() => handleSingInSocialN(type)}
              key={index.toString()}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <Icon />
              <Typography
                color="#414042"
                sx={{ ml: 2, paddingBottom: '0px!important', maxWidth: '140px' }}
              >
                {title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TypeSelectRegister;
