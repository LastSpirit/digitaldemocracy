import React, { useState } from 'react';
import { Autocomplete, Box, Checkbox, InputLabel, TextField } from '@material-ui/core';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import DesktopDatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { ru } from 'date-fns/locale';
import styles from './VoteCalendar.module.scss';

export const VoteCalendar = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <div className={styles.DateContainer}>
      <form className={styles.form}>
        <>
          <div className={styles.futureCheckbox}>
            <Checkbox
              icon={<CircleUnchecked style={{ color: 'black' }} />}
              checkedIcon={<RadioButtonCheckedIcon style={{ color: 'black' }} />}
            />
            <p>Только будущие</p>
          </div>
          <div className={styles.DatePicker}>
            <InputLabel htmlFor="country" className={styles.inputLabel}>
              Выберите дату
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Custom input"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input className={styles.InputCalendar} ref={inputRef} {...inputProps} />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>
        </>
      </form>
    </div>
  );
};
