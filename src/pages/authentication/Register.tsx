import { useContext, useEffect } from 'react';
import type { FC } from 'react';
import {
  Box, Button,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import {
  AddressFormRegister, TypeRegisterSelect,
} from '../../components/authentication/register';
import gtm from '../../lib/gtm';
import { ModalParams } from '../../types/routing';
import { useSearchParams } from '../../hooks/useSearchParams';
import { AuthContext } from '../../contexts/AuthContext';

const getCurrentStepComponent = (step: number) => {
  switch (step) {
    case 1:
      return <AddressFormRegister />;
    case 2:
      return <TypeRegisterSelect />;
    default:
      return <AddressFormRegister />;
  }
};

const Register: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);
  const { registerStep } = useContext(AuthContext);

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
            paddingRight: '45px',
            paddingLeft: '45px'
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '18px',
            }}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
              mb="0"
              fontWeight="300"
            >
              Регистрация
            </Typography>
            <Box
              sx={{
                height: 32,
                '& > img': {
                  maxHeight: '100%',
                  width: 'auto'
                }
              }}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                fontWeight="300"
                variant="h4"
              >
                {registerStep}
                /4
              </Typography>
            </Box>
          </Box>
          {getCurrentStepComponent(registerStep)}
          <Box sx={{ mt: 4, justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
            <Typography>
              Уже есть аккаунт?
            </Typography>
            <Button
              color="primary"
              size="medium"
              variant="outlined"
              onClick={() => setAuthValue('login')}
            >
              Войти
            </Button>
          </Box>
          {registerStep === 1 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Прежде всего, синтетическое тестирование в значительной степени обусловливает важность прогресса профессионального сообщества!
            </Typography>
          </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Register;
