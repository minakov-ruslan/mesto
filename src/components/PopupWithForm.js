import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.form');
    this._buttonSubmit = this._popupForm.querySelector('.form__submit-button');
    this._buttonSubmitText = this._buttonSubmit.textContent;
    this._inputList = this._popupForm.querySelectorAll('.form__input');
    this._inputValues = {};
  }

  _getInputValues() {
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  renderLoading(load) {
    if (load) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      setTimeout(() => this._buttonSubmit.textContent = this._buttonSubmitText, 250);
    }
  }

  close() {
    super.close();
    setTimeout(() => this._popupForm.reset(), 250);
  }
}