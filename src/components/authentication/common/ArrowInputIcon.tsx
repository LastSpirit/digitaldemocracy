import React from 'react';
import { Button, InputAdornment } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

interface InputIconProps {
  disable?: boolean
  onClick?: () => void
}

export const ArrowInputIcon: React.FC<InputIconProps> = ({ disable, onClick }) => (
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
