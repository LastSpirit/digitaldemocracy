import React, { useEffect } from 'react';
import { DataGrid, ruRU } from '@material-ui/data-grid';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { useFetchHistory } from './hooks/useFetchHistory';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { politicianSelectors } from '../../../../slices/politicianSlice';

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ruRU,
);

const TableTooltip: React.FC<{ value: string }> = ({ value }) => (
  <Tooltip title={value}>
    <span className={styles.cell}>{value}</span>
  </Tooltip>
);

const columns = [
  { field: 'position',
    headerName: 'Должность',
    width: 200,
    // eslint-disable-next-line react/destructuring-assignment
    renderCell: (params: any) => <TableTooltip value={params.value} />, },
  // eslint-disable-next-line react/destructuring-assignment
  { field: 'type', headerName: 'Тип', width: 250, renderCell: (params: any) => <TableTooltip value={params.value} /> },
  { field: 'percent', headerName: 'С каким процентом выбран', width: 250 },
  { field: 'years', headerName: 'Годы', width: 150 },

];

export const PositionHistory = () => {
  const { status, fetch } = useFetchHistory();
  const data = useSelector(politicianSelectors.getPositionHistory());
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={data || []}
            columns={columns}
            pageSize={5}
            checkboxSelection={false}
          />
        </ThemeProvider>
      </WrapperAsyncRequest>
    </div>
  );
};
