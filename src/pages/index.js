import './index.css'
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { data } from 'autoprefixer';
import {
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
} from '../utils/constants.js';

let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '40b29233-65c2-48d4-b1a4-31a58abf57d7',
    'Content-Type': 'application/json'
  }
});

const profileEditFormValidator = new FormValidator(config, formEditProfile);
profileEditFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(config, formAddCard);
cardAddFormValidator.enableValidation();

const avatarEditFormValidator = new FormValidator(config, formEditAvatar);
avatarEditFormValidator.enableValidation();

const profileInfo = new UserInfo({ nameSelector: profileName, infoSelector: profileAbout, avatarSelector: profileAvatar });

const popupImage = new PopupWithImage(popupZoomImage);
popupImage.setEventListeners();

const popupConfirmDelete = new PopupWithConfirmation(popupDeleteCardSelector);
popupConfirmDelete.setEventListeners();

const createCard = item => {
  const card = new Card({
    data: item,
    handleCardClick: item => popupImage.open(item),
    handleDeleteClick: cardId => {
      popupConfirmDelete.open();
      popupConfirmDelete.setSubmitHandler(() => {
        api.deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            popupConfirmDelete.close();
          })
          .catch(err => console.log(err));
      });
    },
    handleLikeClick: (cardId, likes) => {
      if (likes.some(like => like._id === userId)) {
        api.deleteLike(cardId)
          .then(data => card.deleteLike(data.likes))
          .catch(err => console.log(err));
      } else {
        api.setLike(cardId)
          .then(data => card.setLike(data.likes))
          .catch(err => console.log(err));
      }
    },
    myId: userId
  }, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  renderer: cardItem => {
    const card = createCard(cardItem);
    cardList.addItem(card);
  }
}, cardsContainer);

const popupAddCard = new PopupWithForm(popupAddCardSelector, card => {
  popupAddCard.renderLoading(true);
  api.addCard(card)
    .then(data => {
      cardList.addItem(createCard(data));
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAddCard.renderLoading(false));
});
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, userInfo => {
  popupEditProfile.renderLoading(true);
  api.editUserInfo(userInfo)
    .then(data => {
      profileInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEditProfile.renderLoading(false));
});
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, userInfo => {
  popupEditAvatar.renderLoading(true);
  api.editAvatar(userInfo)
    .then(data => {
      profileInfo.setUserAvatar(data);
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEditAvatar.renderLoading(false));
});
popupEditAvatar.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  cardAddFormValidator.resetValidation();
  popupAddCard.open();
});

buttonEditProfile.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  profileEditFormValidator.resetValidation();
  popupEditProfile.setInputValues(userInfo);
  popupEditProfile.open();
});

buttonEditAvatar.addEventListener('click', () => {
  avatarEditFormValidator.resetValidation();
  popupEditAvatar.open();
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    profileInfo.setUserInfo(userInfo);
    profileInfo.setUserAvatar(userInfo);
    userId = userInfo._id;
    cardList.renderItems(initialCards);
  })
  .catch(err => console.log(err));