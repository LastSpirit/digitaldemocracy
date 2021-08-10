import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid, ruRU, GridColumns, enUS, frFR, deDE, itIT, esES, ukUA } from '@material-ui/data-grid';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { useFetchHistory } from './hooks/useFetchHistory';
import { WrapperAsyncRequest } from '../../../../components/Loading/WrapperAsyncRequest';
import { politicianSelectors } from '../../../../slices/politicianSlice';

const locale = (currentLang: string) => {
  const localeList = [
    { type: 'ru', lang: ruRU },
    { type: 'en', lang: enUS },
    { type: 'fr', lang: frFR },
    { type: 'it', lang: itIT },
    { type: 'de', lang: deDE },
    { type: 'es', lang: esES },
    { type: 'uk', lang: ukUA }
  ];
  return localeList.find((item) => item.type === currentLang);
};

const theme = (lang: string) => createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  locale(lang).lang || enUS
);

const TableTooltip: React.FC<{ value: string }> = ({ value }) => (
  <Tooltip title={value}>
    <span className={styles.cell}>{value}</span>
  </Tooltip>
);

const columns = (t): GridColumns => [
  {
    field: 'position',
    headerName: t('info.titleTablePosition') || 'Должность',
    width: 600,
    // eslint-disable-next-line react/destructuring-assignment
    renderCell: (params: any) => <TableTooltip value={params.value} />,
  },
  {
    field: 'type',
    headerName: t('info.titleTableType') || 'Тип',
    width: 450,
    // eslint-disable-next-line react/destructuring-assignment
    renderCell: (params: any) => <TableTooltip value={params.value} />,
  },
  {
    field: 'percent',
    headerName: t('info.titleTablePercent') || 'С каким процентом выбран',
    align: 'center',
    width: 250,
    renderCell: (params: any) => params.value || '-',
  },
  { field: 'years', headerName: t('info.titleTableYears') || 'Годы', width: 150 },
];

export const PositionHistory = () => {
  const { t, i18n } = useTranslation();
  const { status, fetch } = useFetchHistory();
  const data = useSelector(politicianSelectors.getPositionHistory());
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <WrapperAsyncRequest status={status}>
        <ThemeProvider theme={theme(i18n.language)}>
          <DataGrid
            rows={data || []}
            columns={columns(t)}
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
