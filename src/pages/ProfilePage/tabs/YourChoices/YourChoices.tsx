import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { WrapperAsyncRequest } from '../../../SingleNewsPage/features/Loading/WrapperAsyncRequest';
import { useLocalesThemeMaterial } from '../../../../hooks/useLocalesThemeMaterial';
import { useFetchChoices } from './hooks/useFetchChoices';

export const YourChoices = () => {
  const { t } = useTranslation();
  const theme = useLocalesThemeMaterial();
  const [rows, setRows] = useState(null);
  const { fetch: fetchChoices, status } = useFetchChoices();
  const date = useSelector(userSelectors.getChoices());
  const { isMobile } = useWindowSize();

  const columns = [
    { field: 'choices', width: isMobile ? 200 : 350 },
    { field: 'candidate', width: 350 },
  ];

  useEffect(() => {
    if (!rows) {
      fetchChoices();
      const row = [];
      date.forEach((data) =>
        row.push({ id: data.election.id, choices: data.election.title, candidate: data.participant.name })
      );
      setRows(row);
    }
  }, [rows]);

  return (
    <WrapperAsyncRequest status={status}>
      <ThemeProvider theme={theme}>
        <div style={{ height: '100%', width: isMobile ? '400px' : '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
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
