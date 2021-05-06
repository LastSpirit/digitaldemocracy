import { CircularProgress } from '@material-ui/core';
import React from 'react';

export const Loading = () => (
  <CircularProgress
    style={{ color: '#00cc00' }}
    size={70}
  />
);
