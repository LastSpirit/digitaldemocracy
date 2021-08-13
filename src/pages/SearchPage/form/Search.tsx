import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, TextField, InputLabel, InputAdornment, IconButton, Container } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BackButton } from '../../../components/BackButton/BackButton';
import styles from '../SearchPage.module.scss';

export const Search = () => {
  const { pathname } = useLocation();

  return (
    <Container className={styles.container}>
      { pathname !== '/' && <BackButton /> }
      <div className={styles.search}>
        <Formik
          initialValues={{
            search: '',
          }}
          onSubmit={async (values) => {
            console.log(values.search);
          }}
          validationSchema={Yup.object().shape({
            search: Yup.string(),
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
              setFieldValue,
            } = props;
            return (
              <form onSubmit={handleSubmit} noValidate>
                <div>
                  <TextField
                    type="text"
                    id="search"
                    variant="outlined"
                    fullWidth
                    // label="Поиск"
                    placeholder="Поиск"
                    value={values.search}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
              </form>
            );
          }}
        </Formik>
        <Button
          variant="outlined"
          className={styles.searchButton}
          sx={{
            backgroundColor: '#363557',
            borderRadius: '0 70px 70px 0',
            width: '15%',
          }}
        >
          {'Поиск'}
        </Button>
      </div>
    </Container>
  );
};

export default Search;
