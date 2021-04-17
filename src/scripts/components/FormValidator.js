export class FormValidator {
   constructor(selectors, formElement) {
      this._formSelector = selectors.formSelector;
      this._inputSelector = selectors.inputSelector;
      this._submitButtonSelector = selectors.submitButtonSelector;
      this._inactiveButtonClass = selectors.inactiveButtonClass;
      this._inputErrorClass = selectors.inputErrorClass;
      this._errorClass = selectors.errorClass;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
   }

   _checkInputValidity(input) {
      if(!input.validity.valid) {
         this._showInputError(input);
      } else {
         this._hideInputError(input);
      };
   };

   _showInputError(input) {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.add(this._inputErrorClass);
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(this._errorClass);
   };
   
   _hideInputError(input) {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
   }; 

   resetValidation() {
      this._inputList.forEach((inputElement) => {
         this._hideInputError(inputElement)
      });

      this._toggleButtonState();
   }
   
   _setEventListener() {
      this._inputList.forEach((item) => {
         item.addEventListener('input', () => {
            this._checkInputValidity(item)
            this._toggleButtonState(item)
         });
      });
   };

   _toggleButtonState() {
      if(this._hasInvalidInput()){
         this._buttonElement.classList.add(this._inactiveButtonClass);
         this._buttonElement.setAttribute('disabled', true);
      } else {
         this._buttonElement.classList.remove(this._inactiveButtonClass);
         this._buttonElement.removeAttribute('disabled');
      };
   };

   _hasInvalidInput() {
      return this._inputList.some((item) => {
         return !item.validity.valid;
      });
   };

   enableValidation(){
         this._formElement.addEventListener('submit', (evt)=>{
            evt.preventDefault();
         });
         this._setEventListener() 
   };
}

//показывает элемент ошибки
// function showInputError(formElement, inputElement, errorMessage) {
//    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//    inputElement.classList.add(classes['inputErrorClass']);
//    errorElement.textContent = errorMessage;
//    errorElement.classList.add(classes['errorClass']);
// };

//скрывает элемент ошибки
// function hideInputError(formElement, inputElement) {
//    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//    inputElement.classList.remove(classes['inputErrorClass']);
//    errorElement.classList.remove(classes['errorClass']);
//    errorElement.textContent = '';
// }; 

//проверяет валидность поля
// function checkInputValidity(formElement, inputElement) {
//    if(!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, inputElement.validationMessage);
//    } else {
//       hideInputError(formElement, inputElement);
//    };
// };

//добавляет обработчики всем полям формы
// function setEventListener(formElement){
//    const inputList = Array.from(formElement.querySelectorAll(classes['inputSelector']));
//    const buttonElement = formElement.querySelector(classes['submitButtonSelector']);
//    inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', () => {
//          checkInputValidity(formElement, inputElement)
//          toggleButtonState(inputList, buttonElement)
//       });
//    });
// };

//проверяет поля на валидность
// function hasInvalidInput(inputList){
//    return inputList.some((inputElement) => {
//       return !inputElement.validity.valid;
//    });
// };

//меняет активность кнопок отправки формы
// function toggleButtonState(inputList, buttonElement) {
//    if(hasInvalidInput(inputList)){
//       buttonElement.classList.add(classes['inactiveButtonClass']);
//       buttonElement.setAttribute('disabled', true);
//    } else {
//       buttonElement.classList.remove(classes['inactiveButtonClass']);
//       buttonElement.removeAttribute('disabled');
//    };
// };

//находит все формы на странице
// function enableValidation(){
//    const formList = Array.from(document.querySelectorAll(classes['formSelector']));
//    formList.forEach((formElement)=>{
//       formElement.addEventListener('submit', (evt)=>{
//          evt.preventDefault();
//       });
//       setEventListener(formElement) 
//    });
// };
// enableValidation();