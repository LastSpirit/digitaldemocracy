import type { FC } from 'react';
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, TextField, } from '@material-ui/core';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSendResetLinkEmail } from './hooks/useSendResetLinkEmail';
import { authActionCreators } from '../../../slices/authSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { Loading } from '../../Loading/Loading';

const PasswordResetSendEmail: FC = () => {
  const isMountedRef = useIsMountedRef();
  const { setResetStep } = authActionCreators();
  const { status, error, send } = useSendResetLinkEmail(setResetStep);

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={
        Yup
          .object()
          .shape({
            email: Yup
              .string()
              .email('Введите корректный e-mail')
              .max(255)
              .required('Это обязательное поле'),
          })
      }
      onSubmit={async (values, {
        setStatus,
        setSubmitting,
      }): Promise<void> => {
        try {
          await send(
            values.email,
          );
        } catch (err) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        handleChange,
        handleSubmit,
        errors,
        values
      }): JSX.Element => (
        <form
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            helperText={errors.email || error}
            error={!!errors.email || !!error}
            value={values.email}
            onChange={handleChange}
            label="Введите, пожалуйста, свой email"
            variant="outlined"
            name="email"
            sx={{
              mt: 2
            }}
          />
          <Box sx={{ mt: 4 }}>
            <Button
              color="primary"
              disabled={!values.email || status === APIStatus.Loading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {status === APIStatus.Loading ? <Loading /> : 'ПРОДОЛЖИТЬ'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default PasswordResetSendEmail;
