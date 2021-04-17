import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
   constructor(popupSelector){
      super(popupSelector)
   }

   openPopup(link, name){
      super.openPopup();
      this._popup.querySelector('.img-popup__image').src = link;
      this._popup.querySelector('.img-popup__title').textContent = name;
   }
}