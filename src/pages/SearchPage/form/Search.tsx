import React, { useState } from 'react';
import { Button, TextField, InputLabel, InputAdornment, IconButton, Container } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BackButton } from '../../../components/BackButton/BackButton';
import styles from '../SearchPage.module.scss';

export const Search = () => {
  return (
    <Container className={styles.container}>
      <BackButton />
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
                    variant={'outlined'}
                    fullWidth
                    label="Поиск"
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
                    }}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default Search;
