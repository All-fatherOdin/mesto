import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
   constructor(popupSelector, submitForm){
      super(popupSelector);
      this._submitForm = submitForm;
      this._inputs = this._popup.querySelectorAll('.popup__text');
   }

   _getInputValues() {
      this._formValues = {};
      this._inputs.forEach((input) => {
         if(input.name.includes('name')){
            this._formValues["name"] = input.value;
         } else if(input.name.includes('location')){
            this._formValues["link"] = input.value;
         } else {
            this._formValues["about"] = input.value;
         }
      });
      return this._formValues;
   }

   setEventListeners() {
      super.setEventListeners();
      this._popup
      .querySelector('.popup__save-button')
      .addEventListener('click', (evt) => {
         evt.preventDefault();
         this._submitForm(this._getInputValues());
      })
   }

   closePopup() {
      super.closePopup();
      this._inputs.forEach((item) => {
         item.value = '';
      })
   }
}