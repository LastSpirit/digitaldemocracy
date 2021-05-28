import type { FC } from 'react';
import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './NewsNav.module.scss';

const NewsNav: FC = () => {
  const navigation = [
    { title: 'Актуальное', id: 0 },
    { title: 'Подписки', id: 1 },
    { title: 'Новости региона', id: 2 }
  ];
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box className={styles.nav}>
      <div className={styles.list}>
        {navigation.map((item) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            onClick={() => setSelectedTab(item.id)}
            className={classNames(styles.listItem, { [styles.selectedItem]: item.id === selectedTab })}
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
