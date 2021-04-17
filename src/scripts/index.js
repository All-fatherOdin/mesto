import ('../pages/index.css');

import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';
import popupDelCard from './components/popupDelCard.js'
import {classes, editProfileLayout, editProfileInputName, editProfileInputInfo, editProfileButton, 
   addCardsLayout, addCardsButton, profileAvatar, avatarButton, avatarLayout, avatar} from './utils/constants.js';

const userInfo = new UserInfo({userNameSelector: '.profile__name',
                              userInfoSelector: '.profile__career'});

const getInfoFromServer = new Api({cohortId: 'cohort-22', 
                                 token: '3c946ec2-c7fc-48d8-9469-bc7da07a0d23'});

const cardsInit = new Section({
   renderer: (item) => {
               return createCard(item);}
               }, 
   '.elements__list');

const delCardPopup = new popupDelCard('#del-card-popup', 
   (card, cardId) => {
      getInfoFromServer.makeRequestDeleteCard(cardId)
      .then(() =>{
         card.removeCard();
         delCardPopup.closePopup();
      })
      .catch((err) => console.log(`Ответ удаления карты не пришел ${err}`));
   })
delCardPopup.setEventListeners();


const createCard = (argument) => {
   const card = new Card(argument, '.template-gallery', 
                        () => {
                           imgPopup.openPopup(argument.link, argument.name);
                        },
                        () => {
                           delCardPopup.openPopup(card, card.getId());
                        },
                        (likeCounter) => {
                           getInfoFromServer.makeRequestLike(argument._id)
                              .then(card => {
                                 likeCounter.textContent = card.likes.length;
                              })
                        },
                        (likeCounter) => {
                           likeCounter.textContent -= 1;
                           getInfoFromServer.makeRequestDeleteLike(argument._id)
                              .then(card => {
                                 likeCounter.textContent = card.likes.length;
                              })
})
   const cardElement = card.generateCard();
   return cardElement;
}


const newCardPopup = new PopupWithForm('#gallery-popup',
                                       (inputsValues) => {
                                          const promise = new Promise(resolve => {
                                             newCardPopup.startLoading();
                                             getInfoFromServer.makeRequestAddPicture({
                                             pictureName: inputsValues.name,
                                             link: inputsValues.link}).then(resolve)
                                          })
                                          promise.then(data => {
                                             cardsInit.addItem(createCard(data));
                                             })
                                             .then(() => {
                                                newCardPopup.closePopup();
                                                newCardPopup.endLoading();
                                             })
                                             .catch(err => console.log(`Ответ новой картинки
                                             не пришел ${err}`))
                                       });
newCardPopup.setEventListeners();

const profilePopup = new PopupWithForm('#profile-popup',
                                       (inputsValues) => {
                                          const promise = new Promise(resolve => {
                                             profilePopup.startLoading();
                                             getInfoFromServer.makeRequestChangeProfile({
                                             userName: inputsValues.name, about: inputsValues.about})
                                                .then(resolve);
                                          })
                                          promise.then(info => {
                                             userInfo.setUserInfo({name: info.name,
                                                                  about: info.about})
                                             })
                                             .then(() => {
                                                profilePopup.closePopup();
                                                profilePopup.endLoading();
                                             })
                                             .catch(err => console.log(`Ответ редактирования 
                                             профиля не пришел ${err}`))
                                       });
profilePopup.setEventListeners();

const imgPopup = new PopupWithImage('#image-popup');
imgPopup.setEventListeners();

const avatarPopup = new PopupWithForm('#avatar-popup',
                                       (inputValue) => {
                                          const promise = new Promise(resolve => {
                                             avatarPopup.startLoading();
                                             getInfoFromServer.makeRequestChangeAvatar(inputValue.link)
                                             .then(resolve)
                                          })
                                             promise.then(ava => {
                                                avatar.src = ava.avatar;
                                             })
                                             .then(() => {
                                                avatarPopup.closePopup();
                                                avatarPopup.endLoading();
                                             })
                                             .catch(err => console.log(`Ответ аватара
                                             не пришел ${err}`))
});
avatarPopup.setEventListeners()

getInfoFromServer.makeRequestGetInfo('cards')
   .then(cards => { 
      cardsInit.renderCards(cards);
   })
   .catch(() => console.log(`Ответ карточек не пришел ${err}`));

getInfoFromServer.makeRequestGetInfo('users/me')
   .then(info => {
      userInfo.setUserInfo({name: info.name, about: info.about})
      profileAvatar.src = info.avatar;
   })
   .catch(() => console.log(`Ответ профиля не пришел ${err}`));

const cardsFormValidate = new FormValidator(classes, addCardsLayout);
cardsFormValidate.enableValidation()

const profileFormValidate = new FormValidator(classes, editProfileLayout);
profileFormValidate.enableValidation()

const avatarFormValidate = new FormValidator(classes, avatarLayout);
avatarFormValidate.enableValidation()

editProfileButton.addEventListener('click', () => {
   const profileInfo = userInfo.getUserInfo();
   editProfileInputName.value = profileInfo.name;
   editProfileInputInfo.value = profileInfo.about;
   profilePopup.openPopup();
   profileFormValidate.resetValidation()
});

addCardsButton.addEventListener('click', () => {
   newCardPopup.openPopup();
   cardsFormValidate.resetValidation()
});

avatarButton.addEventListener('click', () =>{avatarPopup.openPopup()})