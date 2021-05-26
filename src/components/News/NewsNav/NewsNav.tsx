import type { FC } from 'react';
import { Box, List, ListItem } from '@material-ui/core';
import styles from './NewsNav.module.scss';

const NewsNav: FC = () => {
  console.log('nav');
  const navigation = [
    { title: 'Актуальное', id: 0 },
    { title: 'Подписки', id: 1 },
    { title: 'Новости региона', id: 2 }

  ];
  return (
    <Box className={styles.nav}>
      <List className={styles.list}>
        {navigation.map((item) => (
          <ListItem
            className={styles.listItem}
            key={item.id}
          >
            {item.title}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NewsNav;
