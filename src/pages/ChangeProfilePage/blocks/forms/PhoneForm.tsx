/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { Button, TextField, InputLabel } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Loading } from 'src/components/Loading/Loading';
import { APIStatus } from 'src/lib/axiosAPI';
import { useFetchPhone } from '../../hooks/useFetchPhone';
import styles from '../../ChangeProfilePage.module.scss';

export const PhoneForm = () => {
  const { sendPhone, sendCodePhone, statusCheckPhone, statusPhoneCode, statusPhoneMessage, statusCodeMessage, tele } =
    useFetchPhone();

  return (
    <div className={styles.phoneWrapper}>
      <p>Привязать или изменить номер телефона</p>

      <Formik
        initialValues={{
          phone: '',
        }}
        onSubmit={async (values) => {
          await sendPhone(values.phone.split(' ').join(''));
        }}
        validationSchema={Yup.object().shape({
          phone: Yup.string().required('Поле обязательно для заполнения'),
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
            <form className={styles.phone} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.input}>
                  <InputLabel htmlFor="phone" className={styles.inputLabel}>
                    Введите телефон
                  </InputLabel>
                  <TextField
                    type="tel"
                    id="phone"
                    variant={'outlined'}
                    fullWidth
                    label="+7 XXX XXX XX XX"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.phone}
                    error={!!errors.phone}
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
                    type="submit"
                    className={styles.button}
                    disabled={!values.phone ? true : false}
                  >
                    {statusCheckPhone === APIStatus.Loading ? <Loading color="white" /> : 'Подтвердить телефон'}
                  </Button>
                </div>
              </div>
              {statusCheckPhone === APIStatus.Success ? (
                <div className={styles.message} style={{ color: '#248232' }}>
                  СМС с кодом отправлен!
                </div>
              ) : statusCheckPhone === APIStatus.Failure ? (
                <div className={styles.message} style={{ color: 'red' }}>
                  {statusPhoneMessage}
                </div>
              ) : null}
            </form>
          );
        }}
      </Formik>
      <Formik
        initialValues={{
          codeForPhone: '',
        }}
        onSubmit={async (values) => {
          sendCodePhone(tele, values.codeForPhone);
        }}
        validationSchema={Yup.object().shape({
          codeForPhone: Yup.number()
            .typeError('Поле должно содержать только цифры')
            .integer('Только целые числа')
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
            <form className={styles.phone} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.input}>
                  <InputLabel htmlFor="codeForPhone" className={styles.inputLabel}>
                    Введите код из смс
                  </InputLabel>
                  <TextField
                    type="text"
                    id="codeForPhone"
                    variant={'outlined'}
                    fullWidth
                    onChange={handleChange}
                    helperText={errors.codeForPhone}
                    error={!!errors.codeForPhone}
                    disabled={statusCheckPhone !== APIStatus.Success}
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
                    type="submit"
                    className={styles.button}
                    disabled={statusCheckPhone !== APIStatus.Success}
                  >
                    {statusCodeMessage === APIStatus.Loading ? <Loading color="white" /> : 'Ввести код'}
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PhoneForm;
