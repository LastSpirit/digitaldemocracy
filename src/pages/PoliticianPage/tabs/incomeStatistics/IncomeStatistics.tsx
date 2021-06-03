import React from 'react';
import { useSelector } from 'react-redux';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import './IncomeStatistic.module.scss';

export default function Statistic() {
// const data = useSelector(politicianSelectors.getPoliticianInfo());

  const [state, setState] = React.useState(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOo6he5bj5p-_xohXaEsguSvKvX7wb_spkKsj2PyzQN5LRDVRzS4jy0jxAMFR4qq689Vg1GXoVgd2J/pubhtml?widget=true&amp;headers=false'
  );

  return (
    <iframe title="idPolitican" loading="lazy" src={state} />
  );
}

export const IncomeStatistics = () => <Statistic />;
