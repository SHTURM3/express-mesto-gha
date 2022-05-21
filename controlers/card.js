const Card = require('../models/Card');

const dislikeCard = (request, response) => {
  const { cardID } = request.params;
  Card.findByIdAndUpdate(
    cardID,
    { $pull: { likes: request.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return response.status(404).send({ message: 'Данный пост не существует или удалён ранее.' });
      }
      return response.status(200).send({ message: 'Пост отмечен как не понравившейся.' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return response.status(400).send({ message: 'Данный пост не найден.' });
      }
      return response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

const likeCard = (request, response) => {
  const { cardID } = request.params;
  Card.findByIdAndUpdate(
    cardID,
    { $addToSet: { likes: request.user._id } },
    { new: true },
  )
    .then((card) => {
      console.log('card: ', card);
      if (!card) {
        return response.status(404).send({ message: 'Данный пост не существует или удалён ранее.' });
      }
      return response.status(200).send({ message: 'Пост отмечен как понравившейся.' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return response.status(400).send({ message: 'Данный пост не найден.' });
      }
      return response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

const deleteCard = (request, response) => {
  const { cardID } = request.params;
  Card.findByIdAndRemove(cardID)
    .then((card) => {
      if (!card) {
        return response.status(404).send({ message: 'Данный пост не существует или удалён ранее.' });
      }
      return response.status(200).send({ message: 'Пост удалён.' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return response.status(400).send({ message: 'Данный пост не найден.' });
      }
      return response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

// eslint-disable-next-line consistent-return
const createCard = (request, response) => {
  console.log('request.body: ', request.body);
  console.log('Id пользователя создавшего пост: ', request.user._id);

  const { name, link, owner = request.user._id } = request.body;

  if (!name || !link || !owner) {
    return response.status(400).send({ message: 'Ошибка валидации. Имя, ссылка или автор поста не найдены.' });
  }

  Card.create({ name, link, owner })
    .then((card) => {
      response.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return response.status(400).send({ message: 'Проверьте правильность введенных данных.' });
      }
      return response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

const getCard = (request, response) => {
  const { cardID } = request.params;
  console.log(cardID);
  Card.findById(cardID)
    .then((card) => {
      if (!card) {
        return response.status(404).send({ message: 'Данный пост не найден.' });
      }
      return response.status(200).send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return response.status(400).send({ message: 'ID поста передано некорретно.' });
      }
      return response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

const getCards = (_, response) => {
  Card.find({})
    .then((cards) => {
      response.status(200).send(cards);
    })
    .catch(() => {
      response.status(500).send({ message: 'Ошибка сервера.' });
    });
};

module.exports = {
  dislikeCard,
  likeCard,
  deleteCard,
  createCard,
  getCard,
  getCards,
};
