import React, { useState, useEffect, useReducer } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, TextField, InputAdornment, IconButton, Container } from '@material-ui/core';
import cn from 'classnames';
import ClearIcon from '@material-ui/icons/Clear';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BackButton } from '../BackButton/BackButton';
import { useSearch } from './hooks/useSearch';
import { searchActionCreators } from '../../slices/searchSlice';

import styles from './Search.module.scss';

interface filterButtonsI {
  news: ButtonI;
  politician: ButtonI;
  author: ButtonI;
  media: ButtonI;
  parties: ButtonI;
}

interface ButtonI {
  id: number;
  type: string;
  name: string;
  active: boolean;
  keyTranslate: string;
}

const filtersButtons = (t): filterButtonsI => ({
  news: {
    id: 1,
    type: 'isNews',
    name: t('tabs.news'),
    active: false,
    keyTranslate: 'tabs.news'
  },
  politician: {
    id: 2,
    type: 'isPolitician',
    name: t('tabs.politicians'),
    active: false,
    keyTranslate: 'tabs.politicians'
  },
  author: {
    id: 3,
    type: 'isAuthor',
    name: t('tabs.authors'),
    active: false,
    keyTranslate: 'tabs.authors'
  },
  media: {
    id: 4,
    type: 'isMedia',
    name: t('tabs.massMedia'),
    active: false,
    keyTranslate: 'tabs.massMedia'
  },
  parties: {
    id: 5,
    type: 'isParty',
    name: t('tabs.parties'),
    active: false,
    keyTranslate: 'tabs.parties'
  },
});

const reducerFiltersButtons = (state: filterButtonsI, action) => {
  switch (action.type) {
  case 'SET_ACTIVE':
    return {
      ...state,
      [action.payload.key]: {
        ...state[action.payload.key],
        active: !state[action.payload.key].active,
      }
    };
  case 'CHANGE_LANG':
    return Object
      .keys(state)
      .reduce((acc, key) => ({
        ...acc,
        [key]: {
          ...state[key],
          name: action.t(state[key].keyTranslate),
        },
      }), state);
  case 'RESET':
    return Object
      .keys(state)
      .reduce((acc, key) => ({
        ...acc,
        [key]: {
          ...state[key],
          active: false,
        },
      }), state);
  default:
    return state;
  }
};

const setActiveAction = (key) => ({
  type: 'SET_ACTIVE',
  payload: {
    key
  }
});

export const Search = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { push } = useHistory();
  const {
    setSearchQuery,
    clearSearchData,
  } = searchActionCreators();
  const { fetchSearchCategory } = useSearch();
  const [buttons, dispatchBtn] = useReducer(reducerFiltersButtons, filtersButtons(t));

  useEffect(() => {
    dispatchBtn({ type: 'CHANGE_LANG', t });
  }, [i18n.language]);

  const handleSearchChange = (setValue) => (event): void => {
    setValue('search', event.target.value);
    setSearchQuery({ searchQuery: event.target.value });
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      push('/search');
    }
  };

  const handleResetSearch = (handleReset) => (event): void => {
    handleReset(event);
    dispatchBtn({ type: 'RESET' });
    clearSearchData();
  };

  const handleSubmitForm = (values) => {
    const activeButtons = Object.values(buttons).some((item) => item.active);
    if (values.search) {
      if (activeButtons) {
        fetchSearchCategory({
          search: values.search,
          isNews: buttons.news.active,
          isPolitician: buttons.politician.active,
          isAuthor: buttons.author.active,
          isMedia: buttons.media.active,
          isParty: buttons.parties.active,
          page: 1,
          perPage: 4
        });
      } else {
        fetchSearchCategory({
          search: values.search,
          page: 1,
          perPage: 4
        });
      }
    }
  };

  return (
    <Container>
      <Container className={styles.container}>
        { pathname !== '/' && <BackButton /> }
        <div className={styles.search}>
          <Formik
            initialValues={{
              search: ''
            }}
            onSubmit={(values) => {
              handleSubmitForm(values);
            }}
            // TODO t('errors.minSymbol')
            validationSchema={Yup.object().shape({
              search: Yup.string().min(3, 'Нужно ввести минимум 3 символа'),
            })}
            enableReinitialize={true}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                setFieldValue
              } = props;
              return (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles.searchContainer}>
                    <div style={{ display: 'flex', flex: 1 }}>
                      <div className={styles.searchInput}>
                        <TextField
                          type="text"
                          id="search"
                          variant="outlined"
                          fullWidth
                          // label="Поиск"
                          placeholder={t('footer.menu.search')}
                          value={values.search}
                          onChange={handleSearchChange(setFieldValue)}
                          onBlur={handleBlur}
                          onKeyPress={handleKeyPress}
                          error={touched.search && Boolean(errors.search)}
                          helperText={touched.search && errors.search}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleResetSearch(handleReset)}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: '70px 0 0 70px',
                            },
                            className: styles.searchInput
                          }}
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="outlined"
                        onClick={() => values.search.length >= 3 && push('/search')}
                        className={styles.searchButton}
                        sx={{
                          backgroundColor: '#363557',
                          borderRadius: '0 70px 70px 0',
                          width: '15%',
                          maxHeight: '40px',
                        }}
                      >
                        {t('footer.menu.search')}
                      </Button>
                    </div>
                    {pathname === '/search' && (
                      <div className={styles.filterTabs}>
                        {Object.keys(buttons)
                          .map((key) => (
                            <Button
                              key={buttons[key].id}
                              type="submit"
                              variant="outlined"
                              sx={{
                                height: '30px',
                                marginRight: '28px',
                                // backgroundColor: buttons[key].active ? '#363557' : 'initial',
                              }}
                              className={cn({
                                [styles.tabs_active]: buttons[key].active,
                              })}
                              onClick={() => dispatchBtn(setActiveAction(key))}
                            >
                              {buttons[key].name}
                            </Button>
                          ))}
                      </div>
                    )}
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </Container>
  );
};

export default Search;
