import Popup from './Popup.js';

export default class popupDelCard extends Popup{
   constructor(popupSelector, delCardFromServer){
      super(popupSelector);
      this._delCardFromServer = delCardFromServer;
      this._saveButton = this._popup.querySelector('.popup__save-button');
   }

   setEventListeners(){
      super.setEventListeners();
      this._saveButton.addEventListener('click', () => {
         this._delCardFromServer(this._card, this._cardId)
      })
   }

   openPopup(card, cardId){
      super.openPopup();
      this._card = card;
      this._cardId = cardId;
   }
}

