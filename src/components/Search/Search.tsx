import React, { useState, useEffect, useReducer } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, TextField, InputLabel, InputAdornment, IconButton, Container } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Formik, useFormikContext, FormikHelpers, FormikState, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { BackButton } from '../BackButton/BackButton';
import { useSearch } from './hooks/useSearch';
import { searchActionCreators, searchSelectors } from '../../slices/searchSlice';

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
}

const filtersButtons: filterButtonsI = {
  news: {
    id: 1,
    type: 'isNews',
    name: 'Новости',
    active: false,
  },
  politician: {
    id: 2,
    type: 'isPolitician',
    name: 'Политики',
    active: false,
  },
  author: {
    id: 3,
    type: 'isParty',
    name: 'Авторы',
    active: false,
  },
  media: {
    id: 4,
    type: 'isMedia',
    name: 'СМИ',
    active: false,
  },
  parties: {
    id: 5,
    type: 'isAuthor',
    name: 'Партии',
    active: false,
  },
};

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
  default:
    return state;
  }
};

export const Search = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  // const [query, setQuery] = useState({
  //   search: ''
  // });
  const { fetch: fetchSearch } = useSearch();
  const {
    setQuery,
  } = searchActionCreators();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [buttons, dispatchBtn] = useReducer(reducerFiltersButtons, filtersButtons);

  const handleSearchChange = (setValue) => (event): void => {
    setValue('search', event.target.value);
    setQuery({ query: event.target.value });
    console.log(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      push('/search');
    }
  };

  return (
    <Container>
      <Container className={styles.container}>
        { pathname !== '/' && <BackButton /> }
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <Formik
              initialValues={{
                search: ''
              }}
              onSubmit={(values, formikHelpers) => {
                console.log(values.search);
                if (values.search) {
                  fetchSearch({
                    search: values.search,
                    isNews: buttons.news.active,
                    isPolitician: buttons.politician.active,
                    isParty: buttons.author.active,
                    isMedia: buttons.media.active,
                    isParties: buttons.media.active
                  });
                }
              }}
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
                    <div className={styles.searchInput}>
                      <TextField
                        type="text"
                        id="search"
                        variant="outlined"
                        fullWidth
                        // label="Поиск"
                        placeholder="Поиск"
                        value={values.search}
                        onChange={handleSearchChange(setFieldValue)}
                        onBlur={handleBlur}
                        onKeyPress={handleKeyPress}
                        error={touched.search && Boolean(errors.search)}
                        helperText={touched.search && errors.search}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleReset}>
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
                      {'Поиск'}
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </div>
          <div className={styles.filterTabs}>
            {Object.values(buttons).map((item) => (
              <Button
                variant="outlined"
                sx={{
                  height: '30px',
                  marginRight: '28px',
                }}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Search;
