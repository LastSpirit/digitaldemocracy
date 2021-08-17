import { useEffect, useMemo } from 'react';
import { Container, Button } from '@material-ui/core';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loading } from 'src/components/Loading/Loading';
import { useSelector } from 'react-redux';
import { aboutPageSelectors } from 'src/slices/aboutPageSlice';
import { useFetchAboutPage } from './hooks/useAboutThePage';
import Pdf from '../../theme/DD.pdf';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
  const { isMobile } = useWindowSize();
  const { i18n } = useTranslation();
  const lng = i18n.language;
  const data = useSelector(aboutPageSelectors.getAboutPage());
  const { fetch, status } = useFetchAboutPage();
  const textare2Normilize = useMemo(() => {
    if (!data?.textarea2) {
      return '';
    }
    const text = data.textarea2[lng].split(' ').filter((elem) => elem !== 'info@digitaldemocracy.ru');
    return text.join(' ');
  }, [data, lng]);
  useEffect(() => {
    fetch();
  }, []);

  if (!status) {
    return <Loading />;
  }
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.text}>
          <h1>{data.title1[lng]}</h1>
          <p>{data.textarea1[lng]}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.text}>
          <h1>{data.title2[lng]}</h1>
          <p>
            {textare2Normilize} <a href="mailto:info@digitaldemocracy.ru">info@digitaldemocracy.ru</a>
          </p>

          <Button className={styles.button}>
            <a className={styles.text_link} href={Pdf} download>
              Узнать подробнее
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
