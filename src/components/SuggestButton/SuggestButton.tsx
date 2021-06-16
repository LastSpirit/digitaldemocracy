import React from 'react';
import type { FC } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useWindowSize } from 'src/hooks/useWindowSize';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Button, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import { userActionCreators, userSelectors } from 'src/slices/userSlice';
import { RootState } from 'src/store';

import styles from './styles.module.scss';

interface IProps {
  handleClickOpen?: any;
}

export const SuggestButton: FC<IProps> = ({ handleClickOpen }) => {
  const { pathname } = useLocation();
  const { push } = useHistory() as any;
  const { deleteLastRout } = userActionCreators();
  const { data } = useSelector((s: RootState) => s?.user?.routes);
  const lastRout = data[data.length - 2]?.path || '/';
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.mobileButtons}>
      <div className={styles.row}>
        <Button
          className={styles.backButton}
          onClick={() => {
            push(lastRout);
            deleteLastRout();
          }}
        >
          <div className={styles.icon}>←</div>
        </Button>
        <Link to="/suggestion" className={styles.link}>
          <Button
            className={classNames('MuiButton-containedPrimary', styles.changeButton, {
              '-disabled': !isAuthenticated,
            })}
            variant="outlined"
            color="primary"
          >
            <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
              <span>Предложить изменения</span>
            </Tooltip>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuggestButton;
