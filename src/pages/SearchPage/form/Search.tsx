import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, TextField, InputLabel, InputAdornment, IconButton, Container } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Formik, useFormikContext, FormikHelpers, FormikState, FormikProps } from 'formik';
import * as Yup from 'yup';
import { BackButton } from '../../../components/BackButton/BackButton';
import styles from '../SearchPage.module.scss';

export const Search = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const [query, setQuery] = useState({
    search: ''
  });
  // const {
  //   values: { search },
  //   setFieldValue
  // } = useFormikContext();

  const handleSearchChange = (setValue) => (event): void => {
    setValue('search', event.target.value);
    console.log(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      push('/search');
    }
  };

  return (
    <Container className={styles.container}>
      { pathname !== '/' && <BackButton /> }
      <div className={styles.search}>
        <Formik
          initialValues={{
            search: ''
          }}
          onSubmit={async (values) => {
            console.log(values.search);
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
                  onClick={() => push('/search')}
                  className={styles.searchButton}
                  sx={{
                    backgroundColor: '#363557',
                    borderRadius: '0 70px 70px 0',
                    width: '15%',
                  }}
                >
                  {'Поиск'}
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default Search;
