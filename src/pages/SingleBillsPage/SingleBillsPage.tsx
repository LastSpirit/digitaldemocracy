import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
// import { BackButton } from 'src/components/BackButton/BackButton';
import { singleBillsSelector } from 'src/slices/SingleBillsSlice';
import { WrapperAsyncRequest } from './features/Loading/WrapperAsyncRequest';
import SingleBillsHero from './features/SingleBillsHero/SingleBillsHero';
import { SingleBillsStatistics } from './features/SingleBillsStatistics/SingleBillsStatistics';
import { useFetchSingleBills } from './hooks/useFetchSingleBills';

import styles from '../MassMediaPage/MassMediaPage.module.scss';

const SingleBills = (props) => {
  // const { goBack, length, push } = useHistory() as any;
  const { fetch, status } = useFetchSingleBills();
  const data = useSelector(singleBillsSelector.getData());

  useEffect((): any => {
    fetch();
  }, []);
  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          <SingleBillsHero data={data} />
          <SingleBillsStatistics {...data} />
          {/* {data?.news && data?.news.length > 0 ? (
            <SingleBillsList news={data?.news} isMorePages={data?.isMorePages} />
          ) : null} */}
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default SingleBills;
