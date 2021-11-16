import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import { singleNewsActionCreators, singleNewsSelector } from 'src/slices/SingleNewsSlice';
import SingleNewsHero from '../SingleNewsPage/features/SingleNewsHero/SingleNewsHero';
import SingleNewsList from '../SingleNewsPage/features/SingleNewsList/SingleNewsList';
import { useFetchSingleNews } from '../SingleNewsPage/hooks/useFetchSingleNews';
import styles from './ElectionsPage.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import ElectionsInfoPerson from './ElectionsInfoPerson';
import ElectionsInfoСonsignment from './ElectionsInfoСonsignment';

const ElectionsPage = () => {
  const { fetch } = useFetchSingleNews();
  const { isMobile } = useWindowSize();
  const { resetSingleNews } = singleNewsActionCreators();
  const data = useSelector(singleNewsSelector.getData());
  const status = useSelector(singleNewsSelector.getStatus());
  const { link } = useParams() as any;
  useEffect((): any => {
    fetch('iNHrHVX3CNvbXRND1ptX');
    window.scrollTo(0, 0);
    return () => resetSingleNews();
  }, [link]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <div className={styles.container}>
        <WrapperAsyncRequest status={status}>
          {data && <SingleNewsHero data={data?.currentNews} />}
          <div className={!isMobile ? styles.statistic : styles.statisticMobile}>
            <div className={styles.item}>
              <span className={styles.item_span}>Электорат: </span>
              <b>Республика Северная Осетия-Алания</b>
              <b>9999</b>
            </div>
            <div className={styles.item}>
              <span className={styles.item_span}>Присутствуют на сайте:</span> <b>Республика Северная Осетия-Алания</b>
              <b>9999</b>
            </div>
            <div className={styles.item}>
              <span className={styles.item_span}>Проголосовало:</span>
              <b>9999</b>
            </div>
          </div>
          <h2 className={styles.h2}>{'Политики'}</h2>
          <ElectionsInfoPerson />
          <ElectionsInfoPerson />
          <h2 className={styles.h2}>{'Партии'}</h2>
          <ElectionsInfoСonsignment />
          <ElectionsInfoСonsignment />
          {data?.news && data?.news.length > 0 && <SingleNewsList news={data?.news} isMorePages={data?.isMorePages} />}
        </WrapperAsyncRequest>
      </div>
    </Container>
  );
};

export default ElectionsPage;
