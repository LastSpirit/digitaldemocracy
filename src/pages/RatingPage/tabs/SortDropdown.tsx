import React, { useEffect, useCallback } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { useFetchSort } from '../hooks/useFetchSort';
import { ratingActionCreators } from '../../../slices/ratingSlice';
import { useFetchPoliticians } from '../hooks/useFetchPoliticians';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
    },
    text: {
      marginRight: '10px',
      textAlign: 'left',
      letterSpacing: '0',
      color: '#7A7A7A',
      fontFamily: 'HelveticaNeueCyr',
      fontSize: '18px',
      fontWeight: '200',
      fontStyle: 'normal',
      lineHeight: '18px',
      padding: '10px',
    },
    button: {
      display: 'block',
      marginTop: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 130,
      minHeight: 20,
    },
    list: {
      padding: theme.spacing(1),
    },
    label: {
      paddingRight: '15px',
    },
  })
);

export const SortDropdown = ({ text, field }) => {
  const { fetch } = useFetchPoliticians();
  const classes: any = useStyles();
  const [currentCountryId, setCurrentCountryId] = React.useState<string | number>('');
  const [currentRegionId, setCurrentRegionId] = React.useState<string | number>('');
  const [currentCityId, setCurrentCityId] = React.useState<string | number>('');
  const [openCountry, setOpenCountry] = React.useState(false);
  const [openRegion, setOpenRegion] = React.useState(false);
  const [openCity, setOpenCity] = React.useState(false);
  const [sortParams, setSortParams] = React.useState({});
  const [values, setValues] = React.useState({
    country: '',
    region: '',
    city: '',
  });

  const { countries, fetchCounties, fetchRegions, fetchCities, regions, cities } = useFetchSort();

  const { setSortGeography, setSortVote } = ratingActionCreators();

  useEffect(() => {
    fetchCounties();
    if (currentCountryId) {
      fetchRegions(+currentCountryId);
    }
    if (currentRegionId) {
      fetchCities(+currentRegionId);
    }
  }, [currentCountryId, currentRegionId, currentCityId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseCountry = () => {
    setOpenCountry(false);
  };

  const handleOpenCountry = () => {
    setOpenCountry(true);
  };

  const handleCloseRegion = () => {
    setOpenRegion(false);
  };

  const handleOpenRegion = () => {
    setOpenRegion(true);
  };
  const handleCloseCity = () => {
    setOpenCity(false);
  };

  const handleOpenCity = () => {
    setOpenCity(true);
  };

  const onChangeCountry = (event) => {
    setCurrentCountryId(event.target.id);
  };

  const onChangeRegion = (event) => {
    setCurrentRegionId(event.target.id);
  };

  const onChangeCity = useCallback(
    (event) => {
      setCurrentCityId(event.target.id);
      if (field === 'geography') {
        setSortParams({
          city_politician_id: +currentCityId,
          country_politician_id: +currentCountryId,
          region_politician_id: +currentRegionId,
        });
        setSortGeography(sortParams);
        console.log(currentCountryId, 'currentCountryId');
        fetch();
      } else if (field === 'vote') {
        setSortParams((prevState) => ({
          ...prevState,
          country_user_id: +currentCountryId,
          region_user_id: +currentRegionId,
          city_user_id: +currentCityId,
        }));
        setSortVote(sortParams);
      }
      console.log(sortParams, 'sort');
    },
    [currentCityId, currentRegionId, currentCountryId, sortParams]
  );

  return (
    <div className={classes.wrapper}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{text}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="countrySelect"
          open={openCountry}
          name={'country'}
          onClose={handleCloseCountry}
          onOpen={handleOpenCountry}
          value={values.country}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>выберите страну</em>
          </MenuItem>
          {countries.map((country) => (
            <MenuItem
              id={country.id}
              key={country.id}
              value={country.title}
              onClick={onChangeCountry}
              className={classes.list}
            >
              {country.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {currentCountryId && regions.length ? (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label" className={classes.label}>
            По регионам
          </InputLabel>
          <Select
            labelId="select-label"
            id="regionSelect"
            open={openRegion}
            name={'region'}
            onClose={handleCloseRegion}
            onOpen={handleOpenRegion}
            value={values.region}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>выберите регион</em>
            </MenuItem>
            {regions.map((region) => (
              <MenuItem
                id={region.id}
                key={region.id}
                value={region.title}
                onClick={onChangeRegion}
                className={classes.list}
              >
                {region.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
      {currentCountryId && regions.length && currentRegionId && cities.length ? (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label" className={classes.label}>
            По городам
          </InputLabel>
          <Select
            labelId="select-label"
            id="regionSelect"
            open={openCity}
            name={'city'}
            onClose={handleCloseCity}
            onOpen={handleOpenCity}
            value={values.city}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>выберите город</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem id={city.id} key={city.id} value={city.title} onClick={onChangeCity} className={classes.list}>
                {city.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
    </div>
  );
};

export default React.memo(SortDropdown);
