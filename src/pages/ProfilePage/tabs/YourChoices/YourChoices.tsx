import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import { DataGrid, GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { WrapperAsyncRequest } from '../../../SingleNewsPage/features/Loading/WrapperAsyncRequest';
import { useLocalesThemeMaterial } from '../../../../hooks/useLocalesThemeMaterial';
import { useFetchChoices } from './hooks/useFetchChoices';
import styles from './styles.module.scss';

const columns = (isMobile): GridColumns => {
  return [
    {
      field: 'choices',
      width: isMobile ? 300 : 400,
      headerName: 'choices',
      type: 'string',
      renderCell: ({ row }: any) => (
        <span role={'button'} tabIndex={0}>
          {row.choices || '-'}
        </span>
      ),
    },
    {
      field: 'candidate',
      headerName: 'candidate',
      width: isMobile ? 300 : 400,
      type: 'string',
      renderCell: ({ row }: any) => row.candidate || '-',
    },
  ];
};

export const YourChoices = () => {
  const { t } = useTranslation();
  const theme = useLocalesThemeMaterial();
  const [rows, setRows] = useState(null);
  const { fetch: fetchChoices, status } = useFetchChoices();
  const date = useSelector(userSelectors.getChoices());
  const { isMobile } = useWindowSize();

  useEffect(() => {
    const row = [];
    date.forEach((data) =>
      row.push({ id: data.election.id, choices: data.election.title, candidate: data.participant.name })
    );
    setRows(row);
  }, [date]);

  useEffect(() => {
    fetchChoices();
  }, []);

  console.log(rows, 'rows');
  return (
    <WrapperAsyncRequest status={status}>
      <ThemeProvider theme={theme}>
        <div style={{ height: '100%', width: isMobile ? '400px' : '100%' }}>
          <DataGrid
            className={styles.dataGrid}
            columns={columns(isMobile)}
            rows={rows}
            hideFooterPagination={true}
            sortModel={[
              { field: 'choices', sort: 'asc' },
              { field: 'candidate', sort: 'asc' },
            ]}
          />
        </div>
      </ThemeProvider>
    </WrapperAsyncRequest>
  );
};
