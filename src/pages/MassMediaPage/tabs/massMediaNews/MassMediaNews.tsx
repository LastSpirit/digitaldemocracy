import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useFetchNews } from '../../hooks/useFetchNews';
import ChartBlock from './components/ChartBlock';
import NewsBlock from './components/NewsBlock';

export const MassMediaNews = () => {
  return <NewsBlock />;
};
