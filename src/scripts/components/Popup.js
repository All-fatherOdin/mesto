export default class Popup {
   constructor(popupSelector){
      this._popup = document.querySelector(popupSelector);
      this._saveButton = this._popup.querySelector('.popup__save-button')
      this._closePopupEsc = this._closePopupEsc.bind(this);
   }

   openPopup(){
      this._popup.classList.add('layout_active');
      document.addEventListener('keydown', this._closePopupEsc);
   }

   closePopup(){
      this._popup.classList.remove('layout_active');
      document.removeEventListener('keydown', this._closePopupEsc);
   }

   _closePopupOverlay(evt){
      if(evt.target.classList.contains('layout')){
         this.closePopup();
      }
   }

   _closePopupEsc(evt){
      if(evt.key === "Escape"){
         this.closePopup();
      }
   }

   setEventListeners(){
      this._popup.addEventListener('mousedown', (evt) => {this._closePopupOverlay(evt)});
      this._popup.querySelector('.del-button').addEventListener('click',() => {this.closePopup()});
   }

   startLoading(){
      this._saveButtonText = this._saveButton.textContent
      this._saveButton.textContent = 'Сохранение...'
   }
   endLoading(){
      this._saveButton.textContent = this._saveButtonText
   }
}