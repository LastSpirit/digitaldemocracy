import React, { useEffect, useState } from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { APIStatus } from '../../lib/axiosAPI';
import { WrapperAsyncRequest } from '../../components/Loading/WrapperAsyncRequest';
import { BackButton } from '../../components/BackButton/BackButton';
import { MobileButtons } from '../../components/MobileButtons/MobileButtons';
import { DialogSuggest } from './DialogSuggest/DialogSuggest';
import styles from './SuggestionPage.module.scss';

const NEWS = 'NEWS';
const POLITICIAN = 'POLITICIAN';

const SuggestionPage = () => {
  const status: APIStatus = APIStatus.Initial;
  const { isMobile } = useWindowSize();
  const [suggest, setSuggest] = useState(POLITICIAN);
  const [open, setOpen] = useState(false);
  const [infoPolitician, setInfoPolitician] = useState('');
  const [descriptionPoliticain, setDescriptionPolitician] = useState('');
  const [infoNews, setInfoNews] = useState('');
  const [descriptionNews, setDescriptionNews] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="lg" className={styles.container}>
      <WrapperAsyncRequest status={status}>
        {!isMobile && <BackButton />}
        {isMobile && <MobileButtons />}
        <div className={styles.heading}>
          <h2
            className={suggest === POLITICIAN ? styles.active : styles.passive}
            aria-hidden
            onClick={() => setSuggest(POLITICIAN)}
          >
            Добавить политика
          </h2>{' '}
          <h2>/</h2>{' '}
          <h2
            className={suggest === NEWS ? styles.active : styles.passive}
            aria-hidden
            onClick={() => setSuggest(NEWS)}
          >
            Добавить новость
          </h2>
        </div>
        <DialogSuggest open={open} handleClose={handleClose} />
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleClickOpen();
          }}
          method="POST"
        >
          <div className={styles.fieldWrapper}>
            <TextField
              id="info"
              label={`Ссылка на ${suggest === POLITICIAN ? 'политика' : 'новость'}`}
              className={styles.textField}
              fullWidth
              placeholder={`Ссылка на ${suggest === POLITICIAN ? 'политика' : 'новость'}`}
              required
              value={suggest === POLITICIAN ? infoPolitician : infoNews}
              onChange={
                suggest === POLITICIAN ? (e) => setInfoPolitician(e.target.value) : (e) => setInfoNews(e.target.value)
              }
            />
            <TextField
              id="description"
              label="Описание"
              className={styles.textField}
              fullWidth
              placeholder="Описание"
              value={suggest === POLITICIAN ? descriptionPoliticain : descriptionNews}
              onChange={
                suggest === POLITICIAN
                  ? (e) => setDescriptionPolitician(e.target.value)
                  : (e) => setDescriptionNews(e.target.value)
              }
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            className={styles.submitButton}
            type="submit"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            Добавить
          </Button>
        </form>
      </WrapperAsyncRequest>
    </Container>
  );
};

export default SuggestionPage;
