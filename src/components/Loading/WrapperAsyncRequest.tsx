import React, { FC } from 'react';
import { APIStatus } from '../../lib/axiosAPI';
import { Loading } from './Loading';

interface WrapperAsyncRequestProps {
  status: APIStatus
}

export const WrapperAsyncRequest: FC<WrapperAsyncRequestProps> = ({ children, status }) => (
  status === APIStatus.Loading
    ? <Loading />
    : <>{children}</>
);
