export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    return this._element;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleRemoveClick());
    this._imageElement = this._element.querySelector('.card__image');
    this._imageElement.addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));
  }

  _handleLikeClick() {
    this._buttonLike.classList.toggle('card__like-button_active');
  }

  _handleRemoveClick() {
    this._element.remove();
    this._element = null;
  }
}