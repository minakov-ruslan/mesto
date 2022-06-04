const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const formEdit = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('[name = "username"]');
const jobInput = document.querySelector('[name = "about"]');
const formAdd = document.querySelector('[name="add-card"]');
const titleInput = document.querySelector('[name = "title"]');
const linkInput = document.querySelector('[name = "link"]');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupZoom = document.querySelector('.popup_type_zoom-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
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
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards__list');

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
}

function closePopupByOverlay(evt) {
  if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close-button'))) {
    closePopup(evt.currentTarget);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popupElement.addEventListener('mousedown', closePopupByOverlay);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popupElement.removeEventListener('mousedown', closePopupByOverlay);
}

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({ name: titleInput.value, link: linkInput.value });
  closePopup(popupAdd);
  formAdd.reset();
}

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__like-button').addEventListener('click', evt => evt.target.classList.toggle('card__like-button_active'));
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => cardElement.remove());
  cardImageElement.addEventListener('click', () => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    openPopup(popupZoom);
  });
  return cardElement;
}

function renderCard(card) {
  cardsContainer.prepend(createCard(card));
}

initialCards.forEach(card => renderCard(card));
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);
buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  resetValidation(popupEdit, config);
  openPopup(popupEdit);
});
buttonAdd.addEventListener('click', () => {
  formAdd.reset();
  resetValidation(popupAdd, config);
  openPopup(popupAdd);
});