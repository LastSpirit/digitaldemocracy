import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

const columns = (isMobile, t, link, linkVoice): GridColumns => {
  return [
    {
      field: 'choices',
      width: isMobile ? 300 : 400,
      headerName: t('tabs.voice'),
      type: 'string',
      renderCell: ({ row }: any) => (
        <Link role={'button'} className={styles.link} tabIndex={0} to={`/elections/${linkVoice}`}>
          {row.choices || '-'}
        </Link>
      ),
    },
    {
      field: 'candidate',
      headerName: t('tabs.yourCandidate'),
      width: isMobile ? 300 : 400,
      type: 'string',
      renderCell: ({ row }: any) => (
        <Link role={'button'} className={styles.link} tabIndex={0} to={`/politician/${link}/politician_news`}>
          {row.candidate || '-'}
        </Link>
      ),
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

  const getLink = () => {
    return date[0]?.participant.short_link;
  };

  const getLinkVoice = () => {
    return date[1]?.election.short_link;
  };
  console.log(date);
  useEffect(() => {
    const row = [];
    date.forEach((data) =>
      row.push({ id: data.election.id, choices: data.election.title, candidate: data.participant.name })
    );
    setRows(row);
    getLink();
  }, [date]);

  useEffect(() => {
    fetchChoices();
  }, []);

  return (
    <WrapperAsyncRequest status={status}>
      <ThemeProvider theme={theme}>
        <div style={{ height: '100%', width: isMobile ? '400px' : '100%' }}>
          <DataGrid
            className={styles.dataGrid}
            columns={columns(isMobile, t, getLink(), getLinkVoice())}
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
