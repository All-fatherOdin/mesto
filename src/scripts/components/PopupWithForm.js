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
         this._formValues[input.name] = input.value
      });
      console.log(this._formValues)
      return this._formValues;
   }

   setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._submitForm(this._getInputValues());
      })
   }

   closePopup() {
      super.closePopup();
      this._form.reset();
   }
}