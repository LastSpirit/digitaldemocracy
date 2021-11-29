import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Checkbox, InputLabel, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import DesktopDatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { useFetchListElections } from '../hooks/useFetchListElections';
import { useFetchUserElections } from '../hooks/useFetchUserElections';
import styles from './VoteCalendar.module.scss';

export const VoteCalendar = () => {
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());
  const [value, setValue] = useState<Date | null>(new Date());
  const [isOnlyBefore, setIsOnlyBefore] = useState(0);
  const { fetch } = useFetchListElections();
  const { fetchElections } = useFetchUserElections();

  useEffect(() => {
    if (!isAuthenticated) {
      fetch(isOnlyBefore);
    } else {
      fetch(isOnlyBefore);
      fetchElections(isOnlyBefore);
    }
  }, [isOnlyBefore]);
  return (
    <div className={styles.DateContainer}>
      <form className={styles.form}>
        <>
          <div className={styles.futureCheckbox}>
            <Checkbox
              checked={isOnlyBefore === 1}
              onChange={() => setIsOnlyBefore(isOnlyBefore === 0 ? 1 : 0)}
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
