import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
import moment from 'moment';
import { useFetchNews } from '../../hooks/useFetchNews';
import ChartBlock from './components/ChartBlock';
import NewsBlock from './components/NewsBlock';
// import ChartNews from './components/ChartNews.js';
import { Highchart } from './components/Highchart';

export const PoliticianNews = () => {
  const { fetch, status } = useFetchNews();
  // const [startDatePicker, setStartDatePicker] = useState(
  //   new Date(moment().subtract(12, 'months').format('YYYY-MM-DD'))
  // );
  // const [endDatePicker, setEndDatePicker] = useState(new Date());

  // const [startDate, setStartDate] = useState<string>(moment().subtract(12, 'months').format('YYYY-MM-DD'));
  // const [endDate, setEndDate] = useState<string>(moment().format('YYYY-MM-DD'));
  // const [initStartDate, setInitStartDate] = useState<string>(startDate);
  // const [initEndDate, setInitEndDate] = useState<string>(endDate);

  // useEffect(() => {
  //   setStartDate(moment(startDatePicker).format('YYYY-MM-DD'));
  //   setEndDate(moment(endDatePicker).format('YYYY-MM-DD'));
  // }, [startDatePicker, endDatePicker]);

  useEffect(() => {
    fetch();
  }, []);

  // const handleApply = () => {
  //   fetch(startDate, endDate);
  //   setInitStartDate(startDate);
  //   setInitEndDate(endDate);
  // };

  return (
    <WrapperAsyncRequest status={status}>
      {/* <ChartBlock
        endDate={endDate}
        endDatePicker={endDatePicker}
        handleApply={handleApply}
        initEndDate={initEndDate}
        initStartDate={initStartDate}
        setEndDatePicker={setEndDatePicker}
        setStartDatePicker={setStartDatePicker}
        startDate={startDate}
        startDatePicker={startDatePicker}
        status={status}
      /> */}
      <Highchart />
      <NewsBlock />
    </WrapperAsyncRequest>
  );
};
