import { useEffect } from 'react';
import type { FC } from 'react';
import {
  Box, Button,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import {
  LoginAmplify,
  LoginAuth0,
  LoginFirebase,
  LoginJWT
} from '../../components/authentication/login';
import useAuth from '../../hooks/useAuth';
import gtm from '../../lib/gtm';
import { ModalParams } from '../../types/routing';
import { useSearchParams } from '../../hooks/useSearchParams';

const Login: FC = () => {
  const { platform } = useAuth() as any;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  return (
    <>
      <Card sx={{
        width: 555,
      }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '70px',
            px: '45px'
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              mb: 3
            }}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
              Вход
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              mt: 3
            }}
          >
            {platform === 'Amplify' && <LoginAmplify />}
            {platform === 'Auth0' && <LoginAuth0 />}
            {platform === 'Firebase' && <LoginFirebase />}
            {platform === 'JWT' && <LoginJWT />}
          </Box>
          <Box sx={{ mt: 4, justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
            <Typography>
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
