import React from 'react';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../../ChangeProfilePage.module.scss';

export const MainForm = () => {
  const data = useSelector((s: RootState) => s.profile.data);
  return (
    <Formik
      initialValues={{
        name: data?.userProfile?.first_name ?? '',
        lastname: data?.userProfile?.last_name ?? '',
        day: data?.userProfile?.birth_date?.split('-')?.reverse()?.join('-') ?? '',
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
        name: Yup.string().max(255),
        lastname: Yup.string().max(255),
        day: Yup.date(),
        gender: Yup.string(),
        country: Yup.string().required('Это обязательное поле'),
        region: Yup.string(),
        city: Yup.string(),
        religion: Yup.string(),
        education: Yup.string(),
        political_views: Yup.string(),
      })}
      enableReinitialize={true}
    >
      {(props) => {
        const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } =
          props;
        const disabled = !!Object.entries(errors).length || !dirty;
        return (
          <form onSubmit={handleSubmit} className={styles.mainForm} onReset={handleReset} noValidate>
            <InputLabel htmlFor="name" className={styles.inputLabel}>
              Имя
            </InputLabel>
            <TextField
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />
            <InputLabel htmlFor="lastname" className={styles.inputLabel}>
              Фамилия
            </InputLabel>
            <TextField
              type="text"
              id="lastname"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />
            <div className={styles.multiInputs}>
              <div className={styles.rowInput}>
                <InputLabel htmlFor="day" className={styles.inputLabel}>
                  Дата рождения
                </InputLabel>
                <TextField
                  type="date"
                  id="day"
                  value={values.day}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.rowInput}>
                <InputLabel htmlFor="gender" className={styles.inputLabel}>
                  Пол
                </InputLabel>
                <TextField
                  type="text"
                  id="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <InputLabel htmlFor="country" className={styles.inputLabel}>
              Страна
            </InputLabel>
            <TextField
              type="text"
              required
              id="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              variant={'outlined'}
              helperText={errors.country}
              error={!!errors.country}
            />
            <InputLabel htmlFor="region" className={styles.inputLabel}>
              Регион
            </InputLabel>
            <TextField
              type="text"
              id="region"
              value={values.region}
              onChange={handleChange}
              onBlur={handleBlur}
              variant={'outlined'}
            />
            <InputLabel htmlFor="city" className={styles.inputLabel}>
              Город
            </InputLabel>
            <TextField
              type="text"
              id="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              variant={'outlined'}
            />
            <InputLabel htmlFor="religion" className={styles.inputLabel}>
              Религиозные взгляды
            </InputLabel>
            <TextField
              type="text"
              id="religion"
              value={values.religion}
              onChange={handleChange}
              onBlur={handleBlur}
              variant={'outlined'}
            />
            <InputLabel htmlFor="education" className={styles.inputLabel}>
              Образование
            </InputLabel>
            <TextField
              type="text"
              id="education"
              value={values.education}
              onChange={handleChange}
              onBlur={handleBlur}
              variant={'outlined'}
            />
            <InputLabel htmlFor="political_views" className={styles.inputLabel}>
              Политические взгляды
            </InputLabel>
            <TextField
              type="text"
              id="political_views"
              value={values.political_views}
              onChange={handleChange}
              onBlur={handleBlur}
              variant={'outlined'}
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
