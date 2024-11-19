class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.card__image').addEventListener('click', () => {
      this._handleImageClick(this._data);
    });
    this._cardElement.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLikeIcon();
    });
    this._cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _handleLikeIcon() {
    this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_solid');
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardElement.querySelector('.card__image').src = this._data.link;
    this._cardElement.querySelector('.card__image').alt = this._data.name;
    this._cardElement.querySelector('.card__title').textContent = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
