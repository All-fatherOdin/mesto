import Popup from './Popup.js';

export default class popupDelCard extends Popup{
   constructor(popupSelector, delCardFromServer){
      super(popupSelector);
      this._delCardFromServer = delCardFromServer;
      this._saveButton = this._popup.querySelector('.popup__save-button');
   }

   setEventListeners(){
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._delCardFromServer(this._card, this._cardId)
      })
   }

   openPopup(card, cardId){
      super.openPopup();
      this._card = card;
      this._cardId = cardId;
   }

   closePopup() {
      super.closePopup();
      this._form.reset();
   }
}

