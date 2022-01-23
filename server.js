const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const axios = require('axios');

app.get('/', function (request, response) {
  console.log('Home page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, 'Home Page');
    data = data.replace(/\$OG_DESCRIPTION/g, 'Home page description');
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
    response.send(result);
  });
});

app.get('/politician/:short_link/*', async function (request, response) {
  const fetchPolitician = await axios.get(`https://backoffice.digitaldemocracy.ru/api/getPolitician/${request.params.short_link}`);
  const { photo, name, position } = fetchPolitician.data.data;
  if (!photo && !name && !position) {
    console.log('error');
    return;
  }
  // console.log(photo, name, position);

  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, name);
    data = data.replace(/\$OG_DESCRIPTION/g, position);
    result = data.replace(/\$OG_IMAGE/g, photo);
    response.send(result);
  });
});

app.get('/politician/:id/politician_news', function (request, response) {
  console.log('Elections page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Политик');
    data = data.replace(/\$OG_DESCRIPTION/g, 'Узнайте новости политика');
    result = data.replace(/\$OG_IMAGE/g, 'https://dev-backoffice.digitaldemocracy.ru/storage/images/logo.png');
    response.send(result);
  });
});

app.get('/elections/*', function (request, response) {
  console.log('Elections page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Выборы');
    data = data.replace(/\$OG_DESCRIPTION/g, 'Узнайте все о выборах');
    result = data.replace(/\$OG_IMAGE/g, 'https://dev-backoffice.digitaldemocracy.ru/storage/images/logo.png');
    response.send(result);
  });
});

app.get('/author/*', function (request, response) {
  console.log('Author page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Авторы новостей');
    data = data.replace(/\$OG_DESCRIPTION/g, 'Узнать новости автора');
    result = data.replace(/\$OG_IMAGE/g, 'https://dev-backoffice.digitaldemocracy.ru/storage/images/logo.png');
    response.send(result);
  });
});

app.get('/mass-media/*', function (request, response) {
  console.log('Mass-media page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Новости');
    data = data.replace(/\$OG_DESCRIPTION/g, 'Узнайте все о новостях');
    result = data.replace(/\$OG_IMAGE/g, 'https://dev-backoffice.digitaldemocracy.ru/storage/images/logo.png');
    response.send(result);
  });
});

app.get('/party/:id', function (request, response) {
  console.log('Party page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Партии');
    data = data.replace(/\$OG_DESCRIPTION/g, 'Узнайте все о партиях');
    result = data.replace(/\$OG_IMAGE/g, 'https://dev-backoffice.digitaldemocracy.ru/storage/images/logo.png');
    response.send(result);
  });
});

app.get('/singleBills/*', function (request, response) {
  console.log('Party page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Законопроекты');
    data = data.replace(/\$OG_DESCRIPTION/g, 'Узнайте все о законопроектах');
    result = data.replace(/\$OG_IMAGE/g, 'https://dev-backoffice.digitaldemocracy.ru/storage/images/logo.png');
    response.send(result);
  });
});

app.get('/singleNews/*', function (request, response) {
  console.log('Party page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Новости');
    data = data.replace(/\$OG_DESCRIPTION/g, 'Узнайте все важные новости');
    result = data.replace(/\$OG_IMAGE/g, 'https://dev-backoffice.digitaldemocracy.ru/storage/images/logo.png');
    response.send(result);
  });
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function (request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
