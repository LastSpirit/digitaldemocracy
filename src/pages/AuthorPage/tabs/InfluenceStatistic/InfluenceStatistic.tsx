import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, ruRU, GridColumns } from '@material-ui/data-grid';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { authorActionCreators } from 'src/slices/authorSlice';
import styles from './styles.module.scss';
import { useFetchHistory } from './hooks/useFetchHistory';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { useFetchInfluenceStatistic } from '../../hooks/useFetchInfluenceStatistic';

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ruRU
);

interface ILink {
  to?: string;
}

const columns: GridColumns = [
  {
    field: 'name',
    headerName: 'ФИО политика',
    width: 400,
    // eslint-disable-next-line react/destructuring-assignment
    renderCell: ({ row }: any) => (
      <Link<ILink> to={`/politician/${row?.politician?.short_link}`}>{row?.politician?.name || '-'}</Link>
    ),
  },
  // eslint-disable-next-line react/destructuring-assignment
  {
    field: 'influence',
    headerName: '% Влияния',
    width: 150,
    renderCell: (params: any) => params.value || '-',
  },
  {
    field: 'number_of_news',
    headerName: 'Упоминаний',
    width: 150,
    renderCell: (params: any) => params.value || '-',
  },
];

const mobileColumns: GridColumns = [
  {
    field: 'name',
    headerName: 'ФИО политика',
    width: 220,
    // eslint-disable-next-line react/destructuring-assignment
    renderCell: ({ row }: any) => (
      <Link<ILink> to={`/politician/${row?.politician?.short_link}`}>{row?.politician?.name || '-'}</Link>
    ),
  },
  // eslint-disable-next-line react/destructuring-assignment
  {
    field: 'influence',
    headerName: '% Влияния',
    width: 140,
    renderCell: (params: any) => params.value || '-',
  },
  {
    field: 'number_of_news',
    headerName: 'Упоминаний',
    width: 140,
    renderCell: (params: any) => params.value || '-',
  },
];

const mobileSEColumns: GridColumns = [
  {
    field: 'name',
    headerName: 'ФИО политика',
    width: 160,
    // eslint-disable-next-line react/destructuring-assignment
    renderCell: ({ row }: any) => (
      <Link<ILink> to={`/politician/${row?.politician?.short_link}`}>{row?.politician?.name || '-'}</Link>
    ),
  },
  // eslint-disable-next-line react/destructuring-assignment
  {
    field: 'influence',
    headerName: '% Влияния',
    width: 100,
    renderCell: (params: any) => params.value || '-',
  },
  {
    field: 'number_of_news',
    headerName: 'Упоминаний',
    width: 100,
    renderCell: (params: any) => params.value || '-',
  },
];

export const InfluenceStatistic = () => {
  const { statisticStatus } = useSelector((s: RootState) => s.author);
  const data = useSelector((s: RootState) => s.author.statistic);
  const { resetStatistic } = authorActionCreators();
  const { isMobile, isMobileSE } = useWindowSize();
  const { fetchStatistic } = useFetchInfluenceStatistic();
  useEffect(() => {
    fetchStatistic();
    return (): any => resetStatistic();
  }, []);
  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={statisticStatus}>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={data || []}
            columns={isMobile ? (isMobileSE ? mobileSEColumns : mobileColumns) : columns}
            // pageSize={5}
            // checkboxSelection={false}
            // pageSize={0}
            hideFooterPagination={true}
            rowsPerPageOptions={[]}
            className={styles.dataGrid}
          />
        </ThemeProvider>
      </WrapperAsyncRequest>
    </div>
  );
};

export default InfluenceStatistic;
