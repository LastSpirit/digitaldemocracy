import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { Button, Tooltip, Dialog, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import InputTextField from '../../../../components/widgets/inputs/InputTextField';
import styles from '../../PoliticianPage.module.scss';
import { politicianSelectors } from '../../../../slices/politicianSlice';
import PoliticianCards from './PoliticianCards';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { useChangeSubscribe } from '../../hooks/useChangeSubscribe';
import { APIStatus } from '../../../../lib/axiosAPI';
import { Loading } from '../../../../components/Loading/Loading';
import { userSelectors } from '../../../../slices/userSlice';

const PoliticianInfoBlock = () => {
  const data = useSelector(politicianSelectors.getPoliticianInfo());
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const { isMobile } = useWindowSize();
  const { status, change } = useChangeSubscribe();

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState('');
  const [url, setUrl] = useState('');
  const [next, setNext] = useState(false);

  const handleClickOpen = () => {
    setNext(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInfo('');
    setUrl('');
  };

  return (
    <div className={styles.profileInfoContainer}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          {!data?.photo ? <PersonIcon className={styles.noAvatarIcon} /> : <img src={data?.photo} alt="" />}
        </div>
      </div>
      <div className={styles.personBlock}>
        <div className={styles.fioBlock}>
          <div className={styles.fio}>
            <p>{data?.name}</p>
            {data?.english_name && <p className={styles.englishName}>{data?.english_name}</p>}
            <div className={styles.subscribers}>
              <Button
                variant="outlined"
                color={data?.is_subscribed ? 'secondary' : 'primary'}
                onClick={isAuthenticated ? change : undefined}
                disabled={status === APIStatus.Loading}
                className={classNames([
                  'MuiButton-containedPrimary',
                  styles.subscriberButton,
                  { '-disabled': !isAuthenticated },
                ])}
              >
                <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
                  <span>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {status === APIStatus.Loading ? <Loading /> : data?.is_subscribed ? 'Отписаться' : 'Следить'}
                  </span>
                </Tooltip>
              </Button>
              <div>{data?.number_of_subscribers} подписчиков</div>
              {isMobile && (
                <Button
                  className={classNames('MuiButton-containedPrimary', styles.changeButton, {
                    '-disabled': !isAuthenticated,
                  })}
                  variant="outlined"
                  color="primary"
                  onClick={isAuthenticated ? handleClickOpen : null}
                >
                  <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
                    <span>Предложить изменения</span>
                  </Tooltip>
                </Button>
              )}
            </div>
          </div>
          {!isMobile && (
            <Button
              className={classNames('MuiButton-containedPrimary', styles.changeButton, {
                '-disabled': !isAuthenticated,
              })}
              variant="outlined"
              color="primary"
              onClick={isAuthenticated ? handleClickOpen : null}
            >
              <Tooltip title={isAuthenticated ? '' : 'Вы не авторизованы'}>
                <span>Предложить изменения</span>
              </Tooltip>
            </Button>
          )}
        </div>
        <PoliticianCards />
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="lg"
          disableScrollLock={true}
          classes={{
            paper: styles.paper,
          }}
        >
          <div className={styles.crossWrapper}>
            <IconButton onClick={handleClose} className={styles.cross}>
              <CloseIcon />
            </IconButton>
          </div>
          {!next ? (
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                setNext(true);
              }}
              method="POST"
            >
              <h2>Спасибо за ваше участие, мы обязательно ознакомимся с вашим предложением!</h2>
              <div className={styles.fieldWrapper}>
                <TextField
                  id="info"
                  label="Предлагаемая информация"
                  className={styles.textField}
                  fullWidth
                  placeholder="Предлагаемая информация"
                  rows={4}
                  required
                  multiline
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                />
                <TextField
                  id="url"
                  label="Ссылка для подтверждения"
                  className={styles.textField}
                  fullWidth
                  placeholder="Ссылка для подтверждения"
                  required
                  rows={2}
                  multiline
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
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
                Отправить
              </Button>
            </form>
          ) : (
            <h2>Ваше предложение отправлено на рассмотрение</h2>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default PoliticianInfoBlock;
