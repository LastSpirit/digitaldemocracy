import type { FC } from 'react';
import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './NewsNav.module.scss';

interface Props {
  navigation?: Array<{
    title: string,
    id: number,
    type: string
  }>,
  selectedTab?: string,
  onClick?: any
}

const NewsNav: FC<Props> = ({ navigation, selectedTab, onClick }) => {
  return (
    <Box className={styles.nav}>
      <div className={styles.list}>
        {navigation?.map((item) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            onClick={() => onClick(item.type)}
            className={classNames(styles.listItem, { [styles.selectedItem]: item.type === selectedTab })}
            key={item.id}
          >
            {item.title}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default NewsNav;
