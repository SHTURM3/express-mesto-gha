const router = require('express').Router();
const {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controlers/card');

router.delete('/:cardID/likes', dislikeCard);

router.put('/:cardID/likes', likeCard);

router.delete('/:cardID', deleteCard);

router.post('', createCard);

router.get('/:cardID', getCard);

router.get('', getCards);

module.exports.cardRouter = router;
