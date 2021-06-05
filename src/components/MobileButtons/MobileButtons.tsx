import React from 'react';
import type { FC } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { userSelectors } from 'src/slices/userSlice';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface IProps {
  handleClickOpen?: any;
}

export const MobileButtons: FC<IProps> = ({ handleClickOpen }) => {
  const { goBack, length, push } = useHistory() as any;
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.mobileButtons}>
      <Button className={styles.backButton} onClick={() => (length > 2 ? goBack() : push('/'))}>
        <div className={styles.icon}>←</div>
      </Button>
      <Button
        className={classNames('MuiButton-containedPrimary', styles.changeButton, {
          '-disabled': !isAuthenticated,
        })}
        variant="outlined"
        color="primary"
        onClick={isAuthenticated ? handleClickOpen : null}
      >
        <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
          <span>Предложить изменения</span>
        </Tooltip>
      </Button>
    </div>
  );
};

export default MobileButtons;
