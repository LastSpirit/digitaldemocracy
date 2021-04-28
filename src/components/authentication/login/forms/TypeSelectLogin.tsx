import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Typography } from '@material-ui/core';
import { useSendSMSCode } from '../hooks/useSendSMSCode';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { ArrowInputIcon } from '../../common/ArrowInputIcon';
import { authActionCreators, AuthType } from '../../../../slices/authSlice';
import { SingInSocialN, singInVariants } from '../../common/SingInVariants';

const TypeSelectLogin = () => {
  const isMountedRef = useIsMountedRef();
  const { send } = useSendSMSCode();
  const { setAuthType } = authActionCreators();

  const handleSingInSocialN = (type: SingInSocialN) => {
    if (type === SingInSocialN.Yandex) {
      console.log(SingInSocialN.Yandex);
    } else {
      console.log(SingInSocialN.Google);
    }
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
            const { phone } = values;
            await send(phone);
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
              Регистрация через смс
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
  );
};

export default TypeSelectLogin;
