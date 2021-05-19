import React from 'react';
import { Redirect, Route, Switch, useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { PoliticianTabs } from '../../../types/routing';
import styles from '../PoliticianPage.module.scss';

const PoliticianNavigation = () => {
  const { politicianId }: { politicianId: string } = useParams();
  const { location: { pathname } } = useHistory();
  return (
    <div className={styles.navigation}>
      <div className={styles.tabList}>
        {PoliticianTabs.map(({ title, id }, index) => (
          <div
            key={id}
            className={classNames(styles.link, { [styles.withOutBorder]: index === PoliticianTabs.length - 1, [styles['-active']]: pathname.includes(id) })}
          >
            <Link
              to={(location: any) => ({ ...location, pathname: `/politician/${politicianId}/${id}` })}
            >
              {title}
            </Link>
          </div>
        ))}
      </div>
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
