import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  open(value) {
    super.open();
    this._popupImage.src = value.link;
    this._popupImage.alt = value.name;
    this._popupCaption.textContent = value.name;
  }
} 