import { useEffect } from 'react';
import type { FC } from 'react';
import { Box, Button, Divider, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { AddressFormRegister, TypeRegisterSelect, VerifyCodeRegister } from '../../components/authentication/register';
import gtm from '../../lib/gtm';
import { ModalParams } from '../../types/routing';
import { useSearchParams } from '../../hooks/useSearchParams';
import CreatePasswordRegister from '../../components/authentication/register/forms/CreatePasswordRegister';
import { authActionCreators, authSelectors } from '../../slices/authSlice';
import { ModalWrapper } from '../../components/widgets/modals/ModalWrapper';

export const WelcomeTextRegister = () => {
  const {
    [ModalParams.Auth]: { setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);
  return (
    <>
      <Typography align="justify">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Дорогой Друг! Демократия - это &quot;власть народа&quot;, народ является источником власти. Но это ещё и
        ответственность реализовывать это право, делать свой выбор, голосовать за тех, кого народ этой властью наделяет.
        Ответственность проявлять свою позицию, чтобы изменить жизнь для нас и наших детей в нашей стране лучше.
        Цифровая эпоха даёт нам новые возможности. Наша платформа позволяет пользователям формировать рейтинг политиков
        через оценку их действий, что бы на основании него потом сделать осознанный выбор. Важная составляющая рейтинга,
        доверие к нему. Поэтому мы всеми возможными путями будем бороться с попытками нечестно повлиять на рейтинг. Это,
        к сожалению, может затронуть и добропорядочных пользователей. Мы принимаем всех, но если аккаунт будет
        заподозрен в недобросовестной активности, то мы попросим пройти верификацию. В случае непрохождения проверки все
        оценки и действия аккаунта будут удалены. Просим отнестись к этому с пониманием. Добро пожаловать в
        &quot;цифровую демократию&quot;!
      </Typography>
      <Button
        sx={{
          mt: 2,
        }}
        color="primary"
        size="large"
        variant="contained"
        onClick={() => setAuthValue(undefined)}
      >
        Завершить
      </Button>
    </>
  );
};

const getCurrentStepComponent = (step: number) => {
  switch (step) {
  case 1:
    return <AddressFormRegister />;
  case 2:
    return <TypeRegisterSelect />;
  case 3:
    return <VerifyCodeRegister />;
  case 4:
    return <CreatePasswordRegister />;
  case 5:
    return <WelcomeTextRegister />;
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
  const registerStep = useSelector(authSelectors.getRegisterStep());
  const endRegistration = registerStep === 5;
  const { setRegisterStep } = authActionCreators();

  useEffect(
    () => () => {
      setRegisterStep(1);
    },
    []
  );

  return (
    <ModalWrapper>
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
          align={endRegistration ? 'center' : 'left'}
        >
          {endRegistration ? 'Вы успешно зарегистрировались!' : 'Регистрация'}
        </Typography>
        <Box
          sx={{
            height: 32,
            '& > img': {
              maxHeight: '100%',
              width: 'auto',
            },
          }}
        >
          <Typography color="textPrimary" gutterBottom fontWeight="300" variant="h4">
            {!endRegistration && `${registerStep}/4`}
          </Typography>
        </Box>
      </Box>
      {getCurrentStepComponent(registerStep)}
      {registerStep < 3 && (
        <>
          <Box sx={{ mt: 4, justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
            <Typography sx={{ pb: '0!important' }}>Уже есть аккаунт?</Typography>
            <Button
              className={styles.loginButton}
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
              <Typography color="textSecondary" variant="body2">
                Эти данные будут использоваться только для обезличенной статистики
              </Typography>
            </>
          )}
        </>
      )}
    </ModalWrapper>
  );
};

export default Register;
