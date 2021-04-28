import React, { useContext } from 'react';
import { Box, InputAdornment, TextField, Typography, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import '../RegisterStyles.css';
import { useSendCode } from '../hooks/useSendCode';
import { AuthContext, RegisterType } from '../../../../contexts/AuthContext';
import GoogleIcon from '../../../../icons/Google';
import YandexIcon from '../../../../icons/Yandex';

interface InputIconProps {
  disable?: boolean
  onClick?: () => void
}

const InputIcon: React.FC<InputIconProps> = ({ disable, onClick }) => (
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
      onClick={onClick}
      disabled={disable}
      type="submit"
    >
      <ArrowForwardIcon />
    </Button>
  </InputAdornment>
);

enum SingInSocialN {
  Google = 'Google',
  Yandex = 'Yandex'
}

const TypeRegisterSelect = () => {
  const isMountedRef = useIsMountedRef();
  const { send } = useSendCode();
  const { setRegisterStep, setRegisterType, registerType } = useContext(AuthContext);

  const handleSingInSocialN = (type: SingInSocialN) => {
    if (type === SingInSocialN.Yandex) {
      console.log(SingInSocialN.Yandex);
    } else {
      console.log(SingInSocialN.Google);
    }
  };

  const singInVariants = [
    {
      title: 'Вход с аккаунтом Google',
      icon: <GoogleIcon />,
      type: SingInSocialN.Google,
    },
    {
      title: 'Вход с аккаунтом Yandex',
      icon: <YandexIcon />,
      type: SingInSocialN.Yandex,
    }
  ];

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
                helperText={errors.email}
                value={values.email}
                onChange={handleChange}
                label="E-mail"
                variant="outlined"
                error={!!errors.email}
                name="email"
                InputProps={{
                  endAdornment: <InputIcon
                    disable={!values.email || !!errors.email}
                    onClick={() => {
                      setRegisterType(RegisterType.Email);
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
                  endAdornment: <InputIcon
                    disable={!values.phone || !!errors.phone}
                    onClick={() => {
                      setRegisterType(RegisterType.Phone);
                    }}
                  />
                }}
              />
            </form>
          )}
        </Formik>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
          {singInVariants.map(({ type, title, icon }, index) => (
            <Box
              onClick={() => handleSingInSocialN(type)}
              key={index.toString()}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              {icon}
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

export default TypeRegisterSelect;
