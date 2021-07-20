/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Button, TextField, InputLabel } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { Loading } from 'src/components/Loading/Loading';
import { APIStatus } from 'src/lib/axiosAPI';
import { useChangePassword } from '../../hooks/useChangePassword';
import styles from '../../ChangeProfilePage.module.scss';

export const PasswordForm = () => {
  const { fetchSetNewPassword, statusCheckPassword, statusPasswordMessage } = useChangePassword();
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const { data } = useSelector((s: RootState) => s.profile);

  const checkEmailType = data?.userRegistrationTypes?.find(
    ({ user_registration_type }) => user_registration_type === 'Email'
  );

  return checkEmailType ? (
    <div className={styles.passwordWrapper}>
      <h4>Сменить пароль</h4>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          newPasswordRepeat: '',
        }}
        onSubmit={async (values) => {
          await fetchSetNewPassword(values.newPasswordRepeat, values.oldPassword);
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().max(255).min(8).required('Поле обязательно для заполнения'),
          newPassword: Yup.string()
            .max(255)
            .min(8)
            .matches(passwordRegex, 'Пароль должен содержать минимум одну латинскую букву и цифру')
            .required('Поле обязательно для заполнения'),
          newPasswordRepeat: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Пароли должны совпадать')
            .required('Поле обязательно для заполнения'),
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
          const disabled = !!Object.entries(errors).length || !dirty;
          return (
            <form className={styles.email} onSubmit={handleSubmit} noValidate>
              <div className={styles.password}>
                <div className={styles.input}>
                  <InputLabel htmlFor="oldPassword" className={styles.inputLabel}>
                    Введите старый пароль
                  </InputLabel>
                  <TextField
                    type="password"
                    id="oldPassword"
                    variant={'outlined'}
                    fullWidth
                    value={values.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className={styles.input}>
                  <InputLabel htmlFor="newPassword" className={styles.inputLabel}>
                    Введите новый пароль
                  </InputLabel>
                  <TextField
                    type="password"
                    id="newPassword"
                    variant={'outlined'}
                    fullWidth
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.newPassword}
                    error={!!errors.newPassword}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.input}>
                  <InputLabel htmlFor="newPasswordRepeat" className={styles.inputLabel}>
                    Повторите новый пароль
                  </InputLabel>
                  <TextField
                    type="password"
                    id="newPasswordRepeat"
                    variant={'outlined'}
                    fullWidth
                    value={values.newPasswordRepeat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.newPasswordRepeat}
                    error={!!errors.newPasswordRepeat}
                  />
                </div>
                <div className={styles.buttons}>
                  <Button
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
                    className={styles.button}
                    type="submit"
                    disabled={!values.newPasswordRepeat ? true : false}
                  >
                    {statusCheckPassword === APIStatus.Loading ? <Loading color="white" /> : 'Подтвердить изменения'}
                  </Button>
                </div>
              </div>
              {statusCheckPassword === APIStatus.Success ? (
                <div className={styles.message} style={{ color: '#248232' }}>
                  Пароль успешно изменен!
                </div>
              ) : statusCheckPassword === APIStatus.Failure ? (
                <div className={styles.message} style={{ color: 'red' }}>
                  {statusPasswordMessage}
                </div>
              ) : null}
            </form>
          );
        }}
      </Formik>
    </div>
  ) : null;
};

export default PasswordForm;
