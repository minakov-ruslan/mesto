import { data } from "autoprefixer";

export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick, myId }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._myId = myId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._counterLikes = this._element.querySelector('.card__like-counter');
    this._counterLikes.textContent = this._likes.length;
    if (this._myId === this._ownerId) {
      this._buttonDeleteCard.classList.remove('card__delete-button_inactive');
    }
    if (this._likes.some(like => like._id === this._myId)) {
      this._buttonLike.classList.add('card__like-button_active');
    }
    return this._element;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._cardId, this._likes));
    this._buttonDeleteCard = this._element.querySelector('.card__delete-button');
    this._buttonDeleteCard.addEventListener('click', () => this._handleDeleteClick(this._cardId));
    this._imageElement = this._element.querySelector('.card__image');
    this._imageElement.addEventListener('click', () => this._handleCardClick({ name: this._name, link: this._link }));
  }

  setLike(likes) {
    this._buttonLike.classList.add('card__like-button_active');
    this._likes = likes;
    this._counterLikes.textContent = this._likes.length;
  }

  deleteLike(likes) {
    this._buttonLike.classList.remove('card__like-button_active');
    this._likes = likes;
    this._counterLikes.textContent = this._likes.length;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}