/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Button, TextField, InputLabel } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { Loading } from 'src/components/Loading/Loading';
import { APIStatus } from 'src/lib/axiosAPI';
import { useFetchEmail } from '../../hooks/useFetchEmail';
import styles from '../../ChangeProfilePage.module.scss';

export const EmailForm = () => {
  setLocale({
    string: {
      max: 'Указанное количество символов превышает ${max}',
      min: 'Указанное количество символов меньше ${min}',
    },
  });

  const { data } = useSelector((s: RootState) => s.profile);

  const checkEmailType = data?.userRegistrationTypes?.find(
    ({ user_registration_type }) => user_registration_type === ('Гугл аккаунт' || 'Яндекс аккаунт')
  );

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const {
    sendCodeEmail,
    sendEmail,
    statusCheckEmail,
    statusCodeMessage,
    statusEmailCode,
    statusEmailMessage,
    mail,
    statusPassword,
    statusCheckPassword,
    fetchSetNewPassword,
  } = useFetchEmail();

  return !checkEmailType ? (
    <div className={styles.emailWrapper}>
      <h4>Привязать или изменить e-mail</h4>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
          await sendEmail(values.email);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Введите корректный E-mail').required('Поле обязательно для заполнения'),
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
              <div className={styles.row}>
                <div className={styles.input}>
                  <InputLabel htmlFor="email" className={styles.inputLabel}>
                    E-mail
                  </InputLabel>
                  <TextField
                    type="email"
                    id="email"
                    variant={'outlined'}
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email}
                    error={!!errors.email}
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
                    disabled={!values.email ? true : false}
                  >
                    {statusCheckEmail === APIStatus.Loading ? <Loading color="white" /> : 'Подтвердить почту'}
                  </Button>
                </div>
              </div>
              {statusCheckEmail === APIStatus.Success ? (
                <div className={styles.message} style={{ color: '#248232' }}>
                  Код отправлен на вашу почту!
                </div>
              ) : statusCheckEmail === APIStatus.Failure ? (
                <div className={styles.message} style={{ color: 'red' }}>
                  {statusEmailMessage}
                </div>
              ) : null}
            </form>
          );
        }}
      </Formik>
      <Formik
        initialValues={{
          codeEmail: '',
        }}
        onSubmit={async (values) => {
          sendCodeEmail(mail, values.codeEmail);
        }}
        validationSchema={Yup.object().shape({
          codeEmail: Yup.string().max(6).min(6).required('Поле обязательно для заполнения'),
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
              <div className={styles.row}>
                <div className={styles.input}>
                  <InputLabel htmlFor="codeEmail" className={styles.inputLabel}>
                    Введите код
                  </InputLabel>
                  <TextField
                    type="text"
                    id="codeEmail"
                    variant={'outlined'}
                    fullWidth
                    value={values.codeEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.codeEmail}
                    error={!!errors.codeEmail}
                    disabled={statusCheckEmail !== APIStatus.Success}
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
                    disabled={statusCheckEmail !== APIStatus.Success}
                  >
                    {statusEmailCode === APIStatus.Loading ? <Loading color="white" /> : 'Ввести код'}
                  </Button>
                </div>
              </div>
              {statusEmailCode === APIStatus.Success ? (
                <div className={styles.message} style={{ color: '#248232' }}>
                  Ваши данные успешно обновлены!
                </div>
              ) : statusEmailCode === APIStatus.Failure ? (
                <div className={styles.message} style={{ color: 'red' }}>
                  {statusCodeMessage}
                </div>
              ) : null}
            </form>
          );
        }}
      </Formik>
      {statusPassword ? (
        <Formik
          initialValues={{
            password: '',
            passwordRepeat: '',
          }}
          onSubmit={async (values) => {
            await fetchSetNewPassword(mail, values.passwordRepeat);
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .max(255)
              .min(8)
              .matches(passwordRegex, 'Пароль должен содержать минимум одну латинскую букву и цифру')
              .required('Поле обязательно для заполнения'),
            passwordRepeat: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
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
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.password}>
                  <div className={styles.input}>
                    <InputLabel htmlFor="password" className={styles.inputLabel}>
                      Придумайте пароль
                    </InputLabel>
                    <TextField
                      type="password"
                      id="password"
                      variant={'outlined'}
                      fullWidth
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.password}
                      error={!!errors.password}
                    />
                  </div>
                  <div className={styles.input}>
                    <InputLabel htmlFor="passwordRepeat" className={styles.inputLabel}>
                      Повторите пароль
                    </InputLabel>
                    <TextField
                      type="password"
                      id="passwordRepeat"
                      variant={'outlined'}
                      fullWidth
                      value={values.passwordRepeat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.passwordRepeat}
                      error={!!errors.passwordRepeat}
                    />
                  </div>
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
                  >
                    {statusCheckPassword === APIStatus.Loading ? <Loading color="white" /> : 'Задать пароль'}
                  </Button>
                </div>
                {statusCheckPassword === APIStatus.Success ? (
                  <div className={styles.message} style={{ color: '#248232' }}>
                    Пароль успешно задан!
                  </div>
                ) : statusCheckPassword === APIStatus.Failure ? (
                  <div className={styles.message} style={{ color: 'red' }}>
                    При отправке данных произошла ошибка, возможно, ваш почтовый ящик уже привязан к другому аккаунту
                  </div>
                ) : null}
              </form>
            );
          }}
        </Formik>
      ) : null}
    </div>
  ) : null;
};

export default EmailForm;
