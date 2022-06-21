import { popupImage, popupCaption, openPopup, popupZoom } from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
    this._imageElement = this._element.querySelector('.card__image');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeClick());
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleRemoveClick());
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleOpenImagePopup());
  }

  _handleLikeClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _handleRemoveClick() {
    this._element.remove();
  }

  _handleOpenImagePopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupZoom);
  }
}