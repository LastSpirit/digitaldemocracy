import React, { useEffect } from 'react';
import { Box, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ModalParams } from '../../../../types/routing';
import { useSearchParams } from '../../../../hooks/useSearchParams';
import { ModalWrapper } from '../ModalWrapper';
import { useFetchUserData } from './hooks/useFetchUserData';
import { WrapperAsyncRequest } from '../../../Loading/WrapperAsyncRequest';
import { WelcomeTextRegister } from '../../../../pages/authentication/Register';

const YandexRegisterModal: React.FC = () => {
  const { status, getData } = useFetchUserData();
  const {
    [ModalParams.YandexRegister]: { value: yandexRegisterValue, setValue: setYandexRegisterValue },
  } = useSearchParams(ModalParams.YandexRegister);

  useEffect(() => {
    getData();
    return () => {
      setYandexRegisterValue(undefined);
    };
  }, []);

  const onCloseModal = () => {
    setYandexRegisterValue(undefined);
  };

  return (
    <Modal
      open={!!yandexRegisterValue}
      disableAutoFocus
      onClose={onCloseModal}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <WrapperAsyncRequest status={status}>
          <CloseIcon
            onClick={onCloseModal}
            sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer', color: '#B0B0B0', width: 40, height: 40, fontWeight: '300' }}
          />
          <ModalWrapper>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
              mb="2"
              fontWeight="300"
              align="center"
            >
              Вы успешно зарегистрировались!
            </Typography>
            <WelcomeTextRegister />
          </ModalWrapper>
        </WrapperAsyncRequest>
      </Box>
    </Modal>
  );
};

export default YandexRegisterModal;
