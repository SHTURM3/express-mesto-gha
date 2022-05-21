const User = require('../models/User');

const changeAvatar = (request, response) => {
  const { avatar } = request.body;
  User.findByIdAndUpdate(request.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return response.status(404).send({ message: 'Такого пользователя не существует.' });
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return response.status(400).send({ message: 'ID пользователя передано некорретно.' });
      }
      return response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

const changeProfile = (request, response) => {
  const { name, about } = request.body;
  User.findByIdAndUpdate(request.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return response.status(404).send({ message: 'Такого пользователя не существует.' });
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return response.status(400).send({ message: 'Имя или описание пользователя не должно быть менее 2-х и более 30-ти символов.' });
      }
      if (err.kind === 'ObjectId') {
        return response.status(400).send({ message: 'ID пользователя передано некорретно.' });
      }
      return response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

const getUser = (request, response) => {
  const { id } = request.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return response.status(404).send({ message: 'Такого пользователя не существует.' });
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return response.status(400).send({ message: 'ID пользователя передано некорретно.' });
      }
      return response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

// eslint-disable-next-line consistent-return
const createUser = (request, response) => {
  console.log('request.body: ', request.body);
  console.log('Id пользователя создавшего карточку: ', request.user._id);

  const { name, about, avatar } = request.body;

  if (!about || !name || !avatar) {
    return response.status(400).send({ message: 'Ошибка валидации. Имя или описание пользователя не найдены.' });
  }

  User.create({ name, about, avatar })
    .then((user) => {
      response.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // const fields = Object.keys(err.errors).join(', ');
        return response.status(400).send({ message: 'Проверьте правильность введенных данных.' });
      }

      if (err.code === 11000) {
        return response.status(409).send({ message: 'Такой пользователь уже существует.' });
      }
      return response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

const getUsers = (_, response) => {
  User.find({})
    .then((users) => {
      response.status(200).send(users);
    })
    .catch(() => {
      response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

module.exports = {
  changeAvatar,
  changeProfile,
  getUser,
  getUsers,
  createUser,
};
