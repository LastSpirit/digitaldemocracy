/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unneeded-ternary */
import React, { useState } from 'react';
import { Button, TextField, InputLabel } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { Loading } from 'src/components/Loading/Loading';
import { APIStatus } from 'src/lib/axiosAPI';
import { useFetchPhone } from '../../hooks/useFetchPhone';
import { useVerifyFirebaseCode } from '../../hooks/useVerifyFireBaseCode';
import styles from '../../ChangeProfilePage.module.scss';

export const PhoneForm = () => {
  const { sendPhone, statusCheckPhone, statusPhoneCode, statusPhoneMessage, statusCodeMessage, tele } =
    useFetchPhone();

  setLocale({
    number: {
      max: 'Указанное количество символов превышает ${max}',
      min: 'Указанное количество символов меньше ${min}',
    },
  });

  const { verify, statusVerify } = useVerifyFirebaseCode();

  return (
    <div className={styles.phoneWrapper}>
      <h4>Привязать или изменить номер телефона</h4>

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
                  {
                    'СМС с кодом отправлен! (смс может не приходить в течении двух часов, если отправлено слишком много запросов)'
                  }
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
          verify(values.codeForPhone, tele);
          console.log(values.codeForPhone);
        }}
        validationSchema={Yup.object().shape({
          codeForPhone: Yup.number()
            .typeError('Поле должно содержать только цифры')
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
                    {statusVerify === APIStatus.Loading ? <Loading color="white" /> : 'Ввести код'}
                  </Button>
                </div>
              </div>
              {statusVerify === APIStatus.Success ? (
                <div className={styles.message} style={{ color: '#248232' }}>
                  Номер телефона успешно привязан!
                </div>
              ) : statusVerify === APIStatus.Failure ? (
                <div className={styles.message} style={{ color: 'red' }}>
                  Неверный код!
                </div>
              ) : null}
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PhoneForm;