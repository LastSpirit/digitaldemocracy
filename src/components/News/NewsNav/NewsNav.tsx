import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import styles from './NewsNav.module.scss';
import { userSelectors } from '../../../slices/userSlice';

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
  const { country_id: country, region_id: region, city_id: city } = useSelector(userSelectors.getUser());
  const tooltipTitles = {
    country: country?.title,
    region: region?.title,
    city: city?.title
  };

  const navigationFiltered = navigation.filter((item, idx) => {
    if (idx > 1) {
      return tooltipTitles[item.type];
    }
    return true;
  });

  return (
    <Box className={styles.nav}>
      <div className={styles.list}>
        {navigationFiltered?.map((item, idx) => {
          /* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
          if (idx > 1) {
            return (
              <Tooltip title={tooltipTitles[item.type]} key={item.id}>
                <div
                  onClick={() => onClick(item.type)}
                  className={classNames(styles.listItem, { [styles.selectedItem]: item.type === selectedTab })}
                >
                  {item.title}
                </div>
              </Tooltip>
            );
          }
          return (
            <div
              onClick={() => onClick(item.type)}
              className={classNames(styles.listItem, { [styles.selectedItem]: item.type === selectedTab })}
              key={item.id}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default NewsNav;
