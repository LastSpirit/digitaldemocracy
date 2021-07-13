import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../../ChangeProfilePage.module.scss';

export const MainForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        day: '',
        month: '',
        year: '',
        gender: '',
        country: '',
        region: '',
        city: '',
        religion: '',
        education: '',
        political_views: '',
      }}
      onSubmit={async (values) => console.log(values)}
      validationSchema={Yup.object().shape({
        name: Yup.string(),
        lastname: Yup.string(),
        day: Yup.string(),
        month: Yup.string(),
        year: Yup.string(),
        gender: Yup.string(),
        country: Yup.string(),
        region: Yup.string(),
        city: Yup.string(),
        religion: Yup.string(),
        education: Yup.string(),
        political_views: Yup.string(),
      })}
    >
      {(props) => {
        const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } =
          props;
        const disabled = !!Object.entries(errors).length || !dirty;
        return (
          <form onSubmit={handleSubmit} className={styles.mainForm} onReset={handleReset}>
            <div className={styles.inputTitle}>Имя</div>
            <TextField
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
              variant={'filled'}
            />
            <div className={styles.inputTitle}>Фамилия</div>
            <TextField
              type="text"
              id="lastname"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
              variant={'filled'}
            />
            <div className={styles.inputTitle}>Дата рождения</div>
            <div className={styles.dateRow}>
              <TextField
                type="text"
                id="day"
                value={values.day}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.day}
                variant={'filled'}
              />
              <TextField
                type="text"
                id="month"
                value={values.month}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.month}
                variant={'filled'}
              />
              <TextField
                type="text"
                id="year"
                value={values.year}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.year}
                variant={'filled'}
              />
            </div>
            <div className={styles.inputTitle}>Пол</div>
            <TextField
              type="text"
              id="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
              variant={'filled'}
            />
            <div className={styles.inputTitle}>Страна</div>
            <TextField
              type="text"
              id="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
              variant={'filled'}
            />
            <div className={styles.inputTitle}>Регион</div>
            <TextField
              type="text"
              id="region"
              value={values.region}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
              variant={'filled'}
            />
            <div className={styles.inputTitle}>Город</div>
            <TextField
              type="text"
              id="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
              variant={'filled'}
            />
            <div className={styles.inputTitle}>Религия</div>
            <TextField
              type="text"
              id="religion"
              value={values.religion}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
              variant={'filled'}
            />
            <div className={styles.inputTitle}>Образование</div>
            <TextField
              type="text"
              id="education"
              value={values.education}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
              variant={'filled'}
            />
            <div className={styles.inputTitle}>Политические взгляды</div>
            <TextField
              type="text"
              id="political_views"
              value={values.political_views}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
              variant={'filled'}
            />

            <div className={styles.buttons}>
              <Button
                className={styles.submitButton}
                sx={{
                  p: 1,
                  paddingRight: 2,
                  paddingLeft: 2,
                  borderRadius: 100,
                  mr: 3,
                  textDecoration: 'none',
                }}
                size="small"
                variant="outlined"
                type="submit"
              >
                Подтвердить изменения
              </Button>
              <Button
                className={styles.clearButton}
                sx={{
                  p: 1,
                  paddingRight: 2,
                  paddingLeft: 2,
                  borderRadius: 100,
                  mr: 3,
                  textDecoration: 'none',
                }}
                size="small"
                variant="outlined"
                type="reset"
              >
                Сбросить введенные данны
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default MainForm;
