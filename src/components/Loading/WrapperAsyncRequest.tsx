import React, { FC } from 'react';
import { APIStatus } from '../../lib/axiosAPI';
import { Loading } from './Loading';
import styles from './Loading.module.scss';

interface WrapperAsyncRequestProps {
  status: APIStatus
}

export const WrapperAsyncRequest: FC<WrapperAsyncRequestProps> = ({ children, status }) => (
  status === APIStatus.Loading
    ? <div className={styles.loaderWrapper}><Loading size={40} /></div>
    : <>{children}</>
);
