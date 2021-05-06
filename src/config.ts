export const amplifyConfig = {
  aws_project_region: process.env.REACT_APP_AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.REACT_APP_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID
};

export const auth0Config = {
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
};

export const firebaseConfig = {
  apiKey: 'AIzaSyAW-O8B4NYIlNVKLN_vItPJJ7VuIbp5xr8',
  appId: '1:683353512261:web:9a9f4be5d3dc200b17062c',
  authDomain: 'digitaldemocracy-312712.firebaseapp.com',
  databaseURL: 'https://digitaldemocracy-312712.firebaseio.com',
  messagingSenderId: '683353512261',
  projectId: 'digitaldemocracy-312712',
  storageBucket: 'digitaldemocracy-312712.appspot.com',
  measurementId: 'G-3CLW67F6L5',
};

export const gtmConfig = {
  containerId: process.env.REACT_APP_GTM_CONTAINER_ID
};

export const dadataConfig = {
  apiKey: '8abdff555266464aa4fad6bb68b6a14237289c14',
  secretKey: '0ddc8f74f0cd206c8e29923f1c6d8b7c55838664',
  checkAddressUrl: 'https://cleaner.dadata.ru/api/v1/clean/address',
  getAddresses: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
};

export const recaptchaConfig = {
  siteKey: '6Lc5nL0aAAAAAG3x1WmNfH5xfjWtS0DnCJAG0ks2',
  secretKey: '6Lc5nL0aAAAAAH5L5Ef6jJe6B4KWi2sduxWF0tR1'
};

export const OAuthConfig = {
  secretID: '3af251b95a6d40babff085698fa55968',
  password: 'dfc5cec072b942f28b18066dc88dbebf',
};
