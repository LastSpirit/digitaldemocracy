import React, { useEffect, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useHistory } from 'react-router';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datePickerStyles.scss';
import ru from 'date-fns/esm/locale/ru';
import moment from 'moment';
import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './PoliticianPage.module.scss';
import { useFetchNews } from './hooks/useFetchNews';
import { politicianSelectors } from '../../slices/politicianSlice';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';
import { APIStatus } from '../../lib/axiosAPI';

registerLocale('ru', ru);

const options = {
  legend: { position: 'none' },
  axes: {
    x: {
      0: { side: 'bottom', label: '' }
    }
  }
};

const PoliticianPage = () => {
  const { push } = useHistory();
  const [startDate, setStartDate] = useState<string>(moment().subtract(1, 'months').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [startDatePicker, setStartDatePicker] = useState(new Date(moment().subtract(1, 'months').format('YYYY-MM-DD')));
  const [endDatePicker, setEndDatePicker] = useState(new Date());

  const [initStartDate, setInitStartDate] = useState<string>(startDate);
  const [initEndDate, setInitEndDate] = useState<string>(endDate);
  const isPristine = initStartDate === startDate && initEndDate === endDate;

  const { fetch, status } = useFetchNews();
  const validValue = moment(startDate).format('x') < moment(endDate).format('x');

  useEffect(() => {
    setStartDate(moment(startDatePicker).format('YYYY-MM-DD'));
    setEndDate(moment(endDatePicker).format('YYYY-MM-DD'));
  }, [startDatePicker, endDatePicker]);

  const chartData = useSelector(politicianSelectors.getChartData());

  useEffect(() => {
    fetch(startDate, endDate);
  }, []);

  const handleApply = () => {
    fetch(startDate, endDate);
    setInitStartDate(startDate);
    setInitEndDate(endDate);
  };

  const disabled = status === APIStatus.Loading;

  return (
    <Container maxWidth="lg">
      <div className={styles.container}>
        <Button
          className={styles.backButton}
          onClick={() => push('/')}
        >
          <ArrowRightAltIcon
            className={styles.arrow}
          />
          <p>Назад</p>
        </Button>
        <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <WrapperAsyncRequest status={status}>
              <Chart
                height="100%"
                options={options}
                className={styles.chart}
                chartLanguage="ru"
                chartType="Line"
                data={[
                  [
                    { type: 'date', label: 'Дата новости' },
                    'Дата новости',
                  ],
                  ...chartData,
                ]}
              />
            </WrapperAsyncRequest>
          </div>
          <div className={styles.pickersContainer}>
            <div className={classNames(styles.picker, [{ [styles.disabled]: disabled }, { [styles.error]: !validValue }])}>
              <span>Выберте дату начала</span>
              <DatePicker
                disabled={disabled}
                locale="ru"
                selected={startDatePicker}
                onChange={(date) => {
                  setStartDatePicker(date);
                }}
              />
            </div>
            <Button
              color="primary"
              onClick={handleApply}
              variant="contained"
              disabled={!validValue || isPristine}
            >
              Применить
            </Button>
            <div className={classNames(styles.picker, [{ [styles.disabled]: disabled }, { [styles.error]: !validValue }])}>
              <span>Выберите дату конца</span>
              <DatePicker
                disabled={disabled}
                locale="ru"
                selected={endDatePicker}
                onChange={(date) => {
                  setEndDatePicker(date);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PoliticianPage;
