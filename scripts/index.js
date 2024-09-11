// Constants
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
    name: "Vanois National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  }
];

const profileEditModal = document.querySelector("#profile-edit-modal");
const closeButton = profileEditModal.querySelector(".modal__close");
const openButton = document.querySelector(".profile__edit-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title");
const profileDescriptionInput = document.querySelector("#profile-description");
const cardsListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

function closePopup() {
  profileEditModal.classList.remove("modal__open");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  return cardElement;
}

// Generic functions for opening and closing modals
function openModal(modal) {
  modal.classList.add("modal__open");
  document.addEventListener("keydown", escapeHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal__open");
  document.removeEventListener("keydown", escapeHandler);
}

function escapeHandler(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal__open");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function setModalListeners(modalElement) {
  modalElement.addEventListener("click", (event) => {
    if (event.target === modalElement) {
      closeModal(modalElement);
    }
  });
}

// Event listeners
openButton.addEventListener("click", () => openModal(profileEditModal));
closeButton.addEventListener("click", () => closeModal(profileEditModal));
profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup ();
});

setModalListeners(profileEditModal);

console.log(initialCards);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsListEl.append(cardElement);
});