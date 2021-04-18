import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
   constructor(popupSelector){
      super(popupSelector)
      this._img = this._popup.querySelector('.img-popup__image');
      this._imgName = this._popup.querySelector('.img-popup__title');
   }

   openPopup(link, name){
      super.openPopup();
      this._img.src = link;
      this._imgName.textContent = name;
   }
}