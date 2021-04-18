
export class Card {
   constructor({data, userId, cardSelector, handleCardClick, handleCardDelete, handelLike, handleDeleteLike}) {
      this._title = data.name;
      this._image = data.link;
      this._likeCount = data.likes;
      this._usersId = data.owner._id;
      this._userId = userId;
      this._imgId = data._id;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardDelete = handleCardDelete;
      this._handelLike = handelLike;
      this._handleDeleteLike = handleDeleteLike;
      this._element = this._getTemplate();
      this._imageElement = this._element.querySelector('.element__image');
      this._imgName = this._element.querySelector('.element__title');
      this._likeCounter = this._element.querySelector('.element__like-counter');
      this._trashCan = this._element.querySelector('.element__trash-can');
      this._likeButton = this._element.querySelector('.element__like');
      this._likeCounter = this._element.querySelector('.element__like-counter');
   }

   _isUserId(){
      if(this._usersId === this._userId){
         this._trashCan.classList.remove('element__trash-can_disabled')
      }
   }

   _isUserLike(){
      this._likeCount.forEach(item => {
         if(item._id === this._userId){
            this.like();
         }
      })
   }

   getId(){
      return this._imgId;
   }

   _getTemplate() {
      const newCard = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      return newCard
   }
   
   generateCard() {
      this._setEventListeners();
      this._imageElement.src = this._image;
      this._imageElement.alt = this._image;
      this._imageElement.id = this._userId;
      this._imgName.textContent = this._title;
      this._likeCounter.textContent = this._likeCount.length;
      this._isUserId();
      this._isUserLike();
      return this._element;
   }

   _setEventListeners(){
      this._likeButton.addEventListener('click', () => {
         if(!this._likeButton.classList.contains('element__like_active')){
            this.like();
            this._handelLike(this._likeCounter);
         } else if (this._likeButton.classList.contains('element__like_active')){
            this.like();
            this._handleDeleteLike(this._likeCounter);
         }
      });

      this._trashCan.addEventListener('click', () => {
         this._handleCardDelete();
      });

      this._imageElement.addEventListener('click', () => {
         this._handleCardClick();
      });
   }

   like() {
      this._likeButton.classList.toggle('element__like_active');
   };

   removeCard() {
      this._element.remove();
   }
}