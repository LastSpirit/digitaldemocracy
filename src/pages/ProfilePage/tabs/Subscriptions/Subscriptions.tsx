import React, { useReducer, useEffect } from 'react';
import { Button } from '@material-ui/core';
// import InDevelop from '../../../../components/InDevelop/InDevelop';
import { useSelector } from 'react-redux';
import PartyCard from './PartyCard/PartyCard';
import { useFetchPartyPoliticians } from '../../../PartyPage/hooks/useFetchPoliticians';
import classes from './Subscriptions.module.scss';

import { partySelectors } from '../../../../slices/partySlice';
import { userSelectors } from '../../../../slices/userSlice';

interface IState {
  id: number;
  title: string;
  active: boolean;
}

const initialState: IState[] = [
  { id: 1, title: 'Политики', active: true },
  { id: 2, title: 'CМИ', active: false },
  { id: 3, title: 'Авторы', active: false },
];

function reducer(state, action) {
  switch (action.type) {
    case 'setActive':
      return [...state].map((item) => (item.id === action.id ? { ...item, active: true } : { ...item, active: false }));
    default:
      return state;
  }
}

export const Subscriptions = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const data = useSelector(partySelectors.getPartyPoliticians());
  const { fetch, status } = useFetchPartyPoliticians();
  const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());

  useEffect(() => {
    fetch(1);
  }, [isAuthenticated]);

  const setCards = () => {
    return state.find((item) => item.active === true).title;
  };
  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        {state.map(({ id, title, active }) => {
          return (
            <Button
              key={id}
              className={active ? classes.buttonStyle : classes.buttonStyleActive}
              onClick={() => dispatch({ type: 'setActive', id })}
            >
              {title}
            </Button>
          );
        })}
      </div>
      <div className={classes.party}>
        {data?.politicians?.map((item, index) => (
          <PartyCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
