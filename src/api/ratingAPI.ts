import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callAPI } from '../lib/axiosAPI';

const fetchRatingPoliticians = (args) => {
  return callAPI({
    url: 'getRatingPage/politicians',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const fetchRatingAuthors = (args) => {
  return callAPI({
    url: 'getRatingPage/authors',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const fetchRatingMassMedia = (args) => {
  return callAPI({
    url: 'getRatingPage/media',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.payload.token}`,
      },
      params: args.payload.params,
    },
    ...args,
  });
};

const subscribeAuthor = (args) =>
  callAPI({
    url: 'subscribeToAuthor',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const unsubscribeAuthor = (args) =>
  callAPI({
    url: 'unsubscribeFromAuthor',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const subscribeMedia = (args) =>
  callAPI({
    url: 'subscribeToMedia',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const unsubscribeMedia = (args) =>
  callAPI({
    url: 'unsubscribeFromMedia',
    config: {
      headers: {
        Authorization: `Bearer ${args.payload.token}`,
      },
    },
    ...args,
  });

const APIs = {
  fetchRatingPoliticians,
  fetchRatingAuthors,
  fetchRatingMassMedia,
  subscribeAuthor,
  unsubscribeAuthor,
  subscribeMedia,
  unsubscribeMedia,
};

export const ratingAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch
  );
};
