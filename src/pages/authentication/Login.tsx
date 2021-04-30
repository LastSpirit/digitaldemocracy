import React, { useEffect } from 'react';
import type { FC } from 'react';
import {
  Box, Button,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  ConfirmPasswordLogin, TypeSelectLogin
} from '../../components/authentication/login';
import gtm from '../../lib/gtm';
import { ModalParams } from '../../types/routing';
import { useSearchParams } from '../../hooks/useSearchParams';
import { authSelectors } from '../../slices/authSlice';
import { SingInSocialN, singInVariants } from '../../components/authentication/common/SingInVariants';
import { useWindowSize } from '../../hooks/useWindowSize';

const getCurrentStepComponent = (step: number) => {
  switch (step) {
    case 1:
      return <TypeSelectLogin />;
    case 2:
      return <ConfirmPasswordLogin />;
    default:
      return <TypeSelectLogin />;
  }
};

const Login: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleSingInSocialN = (type: SingInSocialN) => {
    if (type === SingInSocialN.Yandex) {
      console.log(SingInSocialN.Yandex);
    } else {
      console.log(SingInSocialN.Google);
    }
  };

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);
  const loginStep = useSelector(authSelectors.getLoginStep());

  const { isMobile } = useWindowSize();

  return (
    <>
      <Card sx={{
        maxWidth: 555,
        width: isMobile ? 'auto' : 555
      }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '70px',
            paddingBottom: '70px!important',
            paddingRight: '45px',
            paddingLeft: '45px'
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
              mb="0"
              fontWeight="300"
            >
              Вход
            </Typography>
          </Box>
          {getCurrentStepComponent(loginStep)}
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
          <Box sx={{
            justifyContent: 'flex-start',
            mt: 4
          }}
          >
            {loginStep === 2 && (
            <Box>
              <Typography sx={{
                color: '#747373',
                textDecoration: 'underline',
                cursor: 'pointer',
                width: 230
              }}
              >
                Восстановить забытый пароль
              </Typography>
            </Box>
            )}
          </Box>
          <Box sx={{ mt: 4, justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
            <Typography sx={{ pb: '0px!important' }}>
              Новый пользователь?
            </Typography>
            <Button
              color="primary"
              size="medium"
              variant="outlined"
              onClick={() => setAuthValue('register')}
            >
              Регистрация
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
