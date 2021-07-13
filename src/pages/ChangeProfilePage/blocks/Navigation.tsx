import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { ProfileTabs } from 'src/types/routing';
import { useHistory } from 'react-router';
import styles from '../ChangeProfilePage.module.scss';

export const Navigation = () => {
  const {
    location: { pathname },
  } = useHistory();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const listItemRef = useRef<HTMLAnchorElement>(null);
  const { isMobile } = useWindowSize();
  const handlePrevClick = () => {
    scrollContainerRef.current.scrollLeft -= listItemRef.current.getBoundingClientRect().width + 10;
  };
  const handleNextClick = () => {
    if (scrollContainerRef) {
      scrollContainerRef.current.scrollLeft += listItemRef.current.getBoundingClientRect().width + 10;
    }
  };
  return (
    <>
      {!isMobile ? (
        <div className={styles.tabList}>
          {/* {ProfileTabs.map(({ title, id }, index) => (
            <Link
              key={id}
              className={classNames(styles.link, {
                [styles.withOutBorder]: index === ProfileTabs.length - 1,
                [styles['-active']]: pathname.includes(id),
              })}
              to={(location: any) => ({ ...location, pathname: `/profile/${id}` })}
            >
              {title}
            </Link>
          ))} */}
        </div>
      ) : (
        <div className={styles.tabListContainer}>
          <ArrowForwardIosIcon className={styles.prevArrow} onClick={handlePrevClick} />
          {/* <div className={styles.tabList} ref={scrollContainerRef}>
            {ProfileTabs.map(({ title, id }, index) => (
              <Link
                ref={index === 0 ? listItemRef : undefined}
                key={id}
                className={classNames(styles.link, {
                  [styles.withOutBorder]: index === ProfileTabs.length - 1,
                  [styles['-active']]: pathname.includes(id),
                })}
                to={(location: any) => ({ ...location, pathname: `/profile/${id}` })}
              >
                {title}
              </Link>
            ))}
          </div> */}
          <ArrowForwardIosIcon className={styles.nextArrow} onClick={handleNextClick} />
        </div>
      )}
    </>
  );
};
