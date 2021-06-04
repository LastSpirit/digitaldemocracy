import React, { FC } from 'react';
import Alert from '@material-ui/lab/Alert';

import { APIStatus } from '../../../../lib/axiosAPI';
import { Loading } from './Loading';
import styles from './Loading.module.scss';
import { FailLoading } from './FailLoading';

interface WrapperAsyncRequestProps {
  status: APIStatus;
  height?: number;
}

export const WrapperAsyncRequest: FC<WrapperAsyncRequestProps> = ({ children, status, height }) =>
  status === APIStatus.Success ? (
    <>{children}</>
  ) : status === APIStatus.Failure ? (
    <FailLoading />
  ) : (
    <div className={styles.loaderWrapper} style={{ height }}>
      <Loading size={150} />
    </div>
  );
