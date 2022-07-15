import './index.css'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const formEdit = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('[name = "username"]');
const infoInput = document.querySelector('[name = "about"]');
const formAdd = document.querySelector('[name="add-card"]');
const profileName = '.profile__title';
const profileAbout = '.profile__subtitle';
const popupZoomImage = '.popup_type_zoom-image';
const cardSelector = '#card-template';
const cardsContainer = '.cards__list';
const popupAddCardSelector = '.popup_type_add-card';
const popupEditProfileSelector = '.popup_type_edit-profile';
const initialCards = [
  {
    name: 'Зеленоград',
    link: 'https://images.unsplash.com/photo-1536577722576-fcfdbcad17e9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3218'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552588355-23e1b81409cd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989'
  },
  {
    name: 'Никола - Ленивец',
    link: 'https://images.unsplash.com/photo-1566206895187-6a408b7fb2ef?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2275'
  },
  {
    name: 'Домбай',
    link: 'https://images.unsplash.com/photo-1637579176819-36455abf2e97?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335'
  },
  {
    name: 'Красноярск',
    link: 'https://images.unsplash.com/photo-1628872227464-2d9b60ca1c4e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1604953364318-dcf6d8273c0d?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274'
  }
];

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const profileInfo = new UserInfo(profileName, profileAbout);

const popupImage = new PopupWithImage(popupZoomImage);
popupImage.setEventListeners();

const profileEditFormValidator = new FormValidator(config, formEdit);
profileEditFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(config, formAdd);
cardAddFormValidator.enableValidation();

const createCard = item => {
  const card = new Card({ data: item, handleCardClick: item => popupImage.open(item) }, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards, renderer: cardItem => {
    const card = createCard(cardItem);
    cardList.addItem(card);
  }
}, cardsContainer);

const popupAddCard = new PopupWithForm(popupAddCardSelector, item => cardList.addItem(createCard(item)));
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, () => profileInfo.setUserInfo(nameInput.value, infoInput.value));
popupEditProfile.setEventListeners();

buttonAdd.addEventListener('click', () => {
  cardAddFormValidator.resetValidation();
  popupAddCard.open();
});

buttonEdit.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.name;
  infoInput.value = userInfo.info;
  profileEditFormValidator.resetValidation();
  popupEditProfile.open();
});

cardList.renderItems();