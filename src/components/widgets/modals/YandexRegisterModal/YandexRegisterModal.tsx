import React, { useEffect } from 'react';
import { Box, Modal } from '@material-ui/core';
import { ModalParams } from '../../../../types/routing';
import { useSearchParams } from '../../../../hooks/useSearchParams';
import { ModalWrapper } from '../ModalWrapper';
import { useFetchUserData } from './hooks/useFetchUserData';
import { WrapperAsyncRequest } from '../../../Loading/WrapperAsyncRequest';

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
        <ModalWrapper>
          <WrapperAsyncRequest status={status}>
            YANDEX MODAL
          </WrapperAsyncRequest>
        </ModalWrapper>
      </Box>
    </Modal>
  );
};

export default YandexRegisterModal;
