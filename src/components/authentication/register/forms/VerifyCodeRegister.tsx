import React, { useContext } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { AuthContext, RegisterType } from '../../../../contexts/AuthContext';
import { useVerifyCodeSend } from '../hooks/useVerifyCodeSend';

const VerifyCodeRegister = () => {
  const isMountedRef = useIsMountedRef();
  const { send } = useVerifyCodeSend();
  const { setRegisterStep, registerType } = useContext(AuthContext);
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
            code: undefined,
            submit: null
          }}
          validationSchema={
                        Yup
                          .object()
                          .shape({
                            code: Yup
                              .number()
                              .typeError('Код подтверждения не может содержать буквы')
                              .required('Код не введен'),
                          })
                    }
          onSubmit={async (values, {
            setErrors,
            setStatus,
            setSubmitting,
          }): Promise<void> => {
            try {
              await send(values.code, setRegisterStep, registerType);
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
              <Typography
                color="#222222"
                align="center"
                variant="h5"
                fontWeight="300"
              >
                Для подтверждения регистрации на
                {' '}
                {registerType === RegisterType.Email ? 'вашу почту отправлено письмо!' : 'ваш телефон отправлен код!'}
              </Typography>
              <Box sx={{ mt: 2 }} />
              <TextField
                fullWidth
                helperText={errors.code}
                error={!!errors.code}
                label="Введите код из письма"
                margin="normal"
                name="code"
                variant="outlined"
                onChange={handleChange}
                value={values.code}
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  color="primary"
                  disabled={!values.code}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  ЗАРЕГИСТРИРОВАТЬСЯ
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default VerifyCodeRegister;
