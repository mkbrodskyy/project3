// ---------------- Initial Cards Data ----------------
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  }
];

// ---------------- DOM Element References ----------------
const profileEditForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileSaveButton = profileEditModal.querySelector(".modal__button")
const addCardModal = document.querySelector("#add-card-modal");
const addCardSaveButton = addCardModal.querySelector(".modal__button")
const previewImageModal = document.querySelector("#preview-image-modal");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const cardTitleInput = document.querySelector("#card-title");
const cardUrlInput = document.querySelector("#card-url");
const cardsListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const previewImage = previewImageModal.querySelector(".modal__image");
const previewCaption = previewImageModal.querySelector(".modal__caption");
const modalOpenedSelector = "modal_opened";

// ---------------- Card Functions ----------------
function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardLikeButton.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewCaption.textContent = cardData.name;
    openModal(previewImageModal);
  });

  return cardElement;
}

function addCard(cardData) {
  const cardElement = createCard(cardData);
  cardsListEl.prepend(cardElement);
}

function renderCard(item, method = "prepend") {
  const cardElement = createCard(item);
  cardsListEl[method](cardElement);
}

const handleLikeIcon = (event) => {
  event.target.classList.toggle("card__like-button_solid");
};

// ---------------- Modal Control Functions ----------------
function toggleModal(modal, isOpen) {
  modal.classList.toggle(modalOpenedSelector, isOpen);
  document[`${isOpen ? 'add' : 'remove'}EventListener`]("keydown", escapeHandler);
}

function openModal(modal) {
  toggleModal(modal, true);
}

function closeModal(modal) {
  toggleModal(modal, false);
}

function escapeHandler(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(`.${modalOpenedSelector}`);
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// ---------------- Form Handlers ----------------
function handleProfileFormSubmit() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit() {
  const newCard = {
    name: cardTitleInput.value,
    link: cardUrlInput.value
  };
  renderCard(newCard);
  closeModal(addCardModal);
  disableSubmitButton(addCardForm);
}

function disableSubmitButton(formElement) {
  const buttonElement = formElement.querySelector(".modal__button");
  buttonElement.classList.add("modal__button_inactive");
  buttonElement.disabled = true;
}

// ---------------- Event Listeners ----------------
editButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

addButton.addEventListener("click", () => {
  openModal(addCardModal);
});

// Save Button Event Listeners
profileSaveButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleProfileFormSubmit();
});

addCardSaveButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleAddCardFormSubmit();
});

// Combining overlay and close button listeners
const popups = document.querySelectorAll('.modal');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('modal_opened') || evt.target.classList.contains('modal__close')) {
      closeModal(popup);
    }
  });
});

// ---------------- Initialize Page ----------------
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});
