import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import { setItem } from 'src/lib/sessionStorageManager';
import { DataGrid, GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'src/hooks/useWindowSize';
import InDevelop from '../../../../components/InDevelop/InDevelop';
import { useFetchDossierTable } from './hooks/useFetchDossierTable';
import { getItem } from '../../../../lib/localStorageManager';
import { WrapperAsyncRequest } from '../../../SingleNewsPage/features/Loading/WrapperAsyncRequest';
import { useLocalesThemeMaterial } from '../../../../hooks/useLocalesThemeMaterial';
import styles from './styles.module.scss';

const columns = (t, onClick): GridColumns => {
  return [
    {
      field: 'name',
      width: 400,
      headerName: t('info.politicianFIO') || 'ФИО политика',
      renderCell: ({ row }: any) => (
        <span
          onClick={() => onClick(row.id)}
          onKeyDown={() => onClick()}
          role={'button'}
          tabIndex={0}
          className={styles.politicianName}
        >
          {row?.name || '-'}
        </span>
      ),
    },
    {
      field: 'ratingUser',
      headerName: `${t('info.ratingUser')}` || 'Ваш рейтинг для политика',
      width: 400,
      renderCell: ({ row }: any) => row.rating || '-',
    },
  ];
};

const mobileColumns = (t, onClick): GridColumns => {
  return [
    {
      field: 'name',
      headerName: t('info.politicianFIO') || 'ФИО политика',
      width: 300,
      renderCell: ({ row }: any) => (
        <span
          onClick={() => onClick(row.id)}
          onKeyDown={() => onClick()}
          role={'button'}
          tabIndex={0}
          className={styles.politicianName}
        >
          {row?.name || '-'}
        </span>
      ),
    },
    {
      field: 'ratingUser',
      headerName: `${t('info.ratingUser')}` || 'Ваш рейтинг для политика',
      width: 300,
      renderCell: ({ row }: any) => row.rating || '-',
    },
  ];
};

export const VotingStatistics = () => {
  const { t } = useTranslation();
  const theme = useLocalesThemeMaterial();
  const [isGraphShown, setIsGraphShown] = useState(false);
  const { fetch: fetchDossierTable, status } = useFetchDossierTable();
  const dossierTablePoliticians = useSelector(userSelectors.getDossierTableData());
  const { isMobile } = useWindowSize();
  console.log(dossierTablePoliticians);

  useEffect(() => {
    fetchDossierTable();
  }, []);

  const showPoliticianChartData = (politicianId: string | number) :void => {};

  return (
    <WrapperAsyncRequest status={status}>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={dossierTablePoliticians}
          columns={isMobile ? mobileColumns(t, showPoliticianChartData) : columns(t, showPoliticianChartData)}
          hideFooterPagination={true}
          className={styles.dataGrid}
        />
      </ThemeProvider>
    </WrapperAsyncRequest>
  );
};
