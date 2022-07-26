const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__edit-avatar-button');
const formEditProfile = document.querySelector('[name="edit-profile"]');
const formAddCard = document.querySelector('[name="add-card"]');
const formEditAvatar = document.querySelector('[name="edit-avatar"]');
const profileName = '.profile__title';
const profileAbout = '.profile__subtitle';
const profileAvatar = '.profile__avatar';
const popupZoomImage = '.popup_type_zoom-image';
const cardSelector = '#card-template';
const cardsContainer = '.cards__list';
const popupAddCardSelector = '.popup_type_add-card';
const popupEditProfileSelector = '.popup_type_edit-profile';
const popupDeleteCardSelector = '.popup_type_delete-card';
const popupEditAvatarSelector = '.popup_type_edit-avatar';
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export {
  buttonEditProfile,
  buttonAddCard,
  buttonEditAvatar,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  profileName,
  profileAbout,
  profileAvatar,
  popupZoomImage,
  cardSelector,
  cardsContainer,
  popupAddCardSelector,
  popupEditProfileSelector,
  popupDeleteCardSelector,
  popupEditAvatarSelector,
  config
}