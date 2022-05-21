const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/card');

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

app.use((request, _, next) => {
  request.user = {
    _id: '6287f6f4f24f98af56bfd786',
  };

  next();
});

app.use('/users', userRouter); // Пользователи (связанные файл: routes/users.js; controllers/users.js)

app.use('/cards', cardRouter); // Карточки (связанные файл: routes/cards.js; controllers/cards.js)

app.listen(PORT, () => {
  console.log('Сервер работает.');
});
