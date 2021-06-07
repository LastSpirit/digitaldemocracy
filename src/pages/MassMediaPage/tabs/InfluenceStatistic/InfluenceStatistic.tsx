import React, { useEffect } from 'react';
import { DataGrid, ruRU, GridColumns } from '@material-ui/data-grid';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useWindowSize } from 'src/hooks/useWindowSize';
import styles from './styles.module.scss';
import { useFetchHistory } from './hooks/useFetchHistory';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ruRU
);

const TableTooltip: React.FC<{ value: string }> = ({ value }) => (
  <Tooltip title={value}>
    <span className={styles.cell}>{value}</span>
  </Tooltip>
);

const columns: GridColumns = [
  {
    field: 'name',
    headerName: 'ФИО политика',
    width: 400,
    // eslint-disable-next-line react/destructuring-assignment
    renderCell: (params: any) => <TableTooltip value={params.value} />,
  },
  // eslint-disable-next-line react/destructuring-assignment
  {
    field: 'percent',
    headerName: '% Влияния',
    width: 400,
    renderCell: (params: any) => params.value || '-',
  },
];

const mobileColumns: GridColumns = [
  {
    field: 'name',
    headerName: 'ФИО политика',
    width: 220,
    // eslint-disable-next-line react/destructuring-assignment
    renderCell: (params: any) => <TableTooltip value={params.value} />,
  },
  // eslint-disable-next-line react/destructuring-assignment
  {
    field: 'percent',
    headerName: '% Влияния',
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
    renderCell: (params: any) => <TableTooltip value={params.value} />,
  },
  // eslint-disable-next-line react/destructuring-assignment
  {
    field: 'percent',
    headerName: '% Влияния',
    width: 100,
    renderCell: (params: any) => params.value || '-',
  },
];

export const InfluenceStatistic = () => {
  const { status, fetch } = useFetchHistory();
  const data = useSelector((s: RootState) => s.massmedia.statistic);
  const { isMobile, isMobileSE } = useWindowSize();
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
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
