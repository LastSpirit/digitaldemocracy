import React, { useRef } from 'react';
import { Redirect, Route, Switch, useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { PoliticianTabs } from '../../../types/routing';
import styles from '../MassMediaPage.module.scss';
import { useWindowSize } from '../../../hooks/useWindowSize';

const PoliticianNavigation = () => {
  const { politicianId }: { politicianId: string } = useParams();
  const { location: { pathname } } = useHistory();
  const { isMobile } = useWindowSize();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const listItemRef = useRef<HTMLAnchorElement>(null);

  const handlePrevClick = () => {
    scrollContainerRef.current.scrollLeft -= (listItemRef.current.getBoundingClientRect().width + 10);
  };

  const handleNextClick = () => {
    if (scrollContainerRef) {
      scrollContainerRef.current.scrollLeft += listItemRef.current.getBoundingClientRect().width + 10;
    }
  };

  return (
    <div
      className={styles.navigation}
    >
      {!isMobile ? (
        <div className={styles.tabList}>
          {PoliticianTabs.map(({ title, id }, index) => (
            <Link
              key={id}
              className={classNames(styles.link, { [styles.withOutBorder]: index === PoliticianTabs.length - 1, [styles['-active']]: pathname.includes(id) })}
              to={(location: any) => ({ ...location, pathname: `/politician/${politicianId}/${id}` })}
            >
              {title}
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.tabListContainer}>
          <ArrowForwardIosIcon
            className={styles.prevArrow}
            onClick={handlePrevClick}
          />
          <div
            className={styles.tabList}
            ref={scrollContainerRef}
          >
            {PoliticianTabs.map(({ title, id }, index) => (
              <Link
                ref={index === 0 ? listItemRef : undefined}
                key={id}
                className={classNames(styles.link, { [styles.withOutBorder]: index === PoliticianTabs.length - 1, [styles['-active']]: pathname.includes(id) })}
                to={(location: any) => ({ ...location, pathname: `/politician/${politicianId}/${id}` })}
              >
                {title}
              </Link>
            ))}
          </div>
          <ArrowForwardIosIcon
            className={styles.nextArrow}
            onClick={handleNextClick}
          />
        </div>
      )}
      <div className={styles.tabContent}>
        <Switch>
          {PoliticianTabs.map(({ id, component }) => (
            <Route
              key={id}
              path={`/politician/:politicianId/${id}`}
              component={component}
            />
          ))}
          <Redirect to={`/politician/:politicianId/${PoliticianTabs[0].id}`} />
        </Switch>
      </div>
    </div>
  );
};

export default PoliticianNavigation;
