export const classes = {
   formSelector: '.popup',
   inputSelector: '.popup__text',
   submitButtonSelector: '.popup__save-button',
   inactiveButtonClass: 'popup__save-button_inactive',
   inputErrorClass: 'popup__text_type_error',
   errorClass: 'popup__text-error_active'
}

export const editProfileLayout = document.querySelector('#profile-popup');
export const editProfileInputName = editProfileLayout.querySelector('#name-input');
export const editProfileInputInfo = editProfileLayout.querySelector('#career-input');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addCardsLayout = document.querySelector('#gallery-popup');
export const addCardsButton = document.querySelector('.profile__add-button');
export const delCardLayout = document.querySelector('#del-card-popup');
export const avatarButton = document.querySelector('.profile__avatar-button');
export const avatarLayout = document.querySelector('#avatar-popup');
