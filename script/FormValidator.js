export default class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    }));
  }

  _toggleButtonState() {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(this._inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
}