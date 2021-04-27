import React from 'react';
import { Modal, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Register from '../../../pages/authentication/Register';
import Login from '../../../pages/authentication/Login';
import { ModalParams } from '../../../types/routing';
import { useSearchParams } from '../../../hooks/useSearchParams';

const AuthModal:React.FC = () => {
  const {
    [ModalParams.Auth]: { value: authValue, setValue: setAuthValue },
  } = useSearchParams(ModalParams.Auth);

  const onCloseModal = () => {
    setAuthValue(undefined);
  };

  return (
    <Modal
      open={!!authValue}
      onClose={onCloseModal}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CloseIcon
          onClick={onCloseModal}
          sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer', color: '#B0B0B0', width: 40, height: 40, fontWeight: '300' }}
        />
        {authValue === 'login' ? <Login /> : <Register />}
      </Box>
    </Modal>
  );
};

export default AuthModal;
