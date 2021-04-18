import ('../pages/index.css');

import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupDelCard from '../scripts/components/PopupDelCard.js'
import {classes, editProfileLayout, editProfileInputName, editProfileInputInfo, editProfileButton, 
   addCardsLayout, addCardsButton,avatarButton, avatarLayout} from '../scripts/utils/constants.js';

let userId;



const userInfo = new UserInfo({userNameSelector: '.profile__name',
                              userInfoSelector: '.profile__career', userAvatarSelector: '.profile__avatar'});

const getInfoFromServer = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1', cohortId: 'cohort-22', 
                                 token: '3c946ec2-c7fc-48d8-9469-bc7da07a0d23', headers: {authorization: '3c946ec2-c7fc-48d8-9469-bc7da07a0d23',
                                 'Content-Type': 'application/json'}
                              });

const cardsInit = new Section({
   renderer: (item) => {
               return createCard(item);
            }
   }, 
   '.elements__list');

const delCardPopup = new PopupDelCard('#del-card-popup', 
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
   const card = new Card({data: argument, userId: userId, cardSelector: '.template-gallery', 
      handleCardClick: () => {
                           imgPopup.openPopup(argument.link, argument.name);
                        },
      handleCardDelete: () => {
                           delCardPopup.openPopup(card, card.getId());
                        },
      handelLike: (likeCounter) => {
                     getInfoFromServer.makeRequestLike(argument._id)
                        .then(card => {
                           likeCounter.textContent = card.likes.length;
                        })
                        .catch((err) => console.log(`Ответ лайка не пришел ${err}`));
                  },
      handleDeleteLike: (likeCounter) => {
                           getInfoFromServer.makeRequestDeleteLike(argument._id)
                              .then(card => {
                                 likeCounter.textContent = card.likes.length;
                              })
                              .catch((err) => console.log(`Ответ удаления лайка не пришел ${err}`));
                        }
      })
   const cardElement= card.generateCard();
   return cardElement;
}

const newCardPopup = new PopupWithForm('#gallery-popup',
                                       (inputsValues) => {
                                          const promise = new Promise(resolve => {
                                             newCardPopup.startLoading();
                                             getInfoFromServer.makeRequestAddPicture({
                                             pictureName: inputsValues['img-name'],
                                             link: inputsValues['img-location']}).then(resolve)
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
                                             userName: inputsValues['user-name'], about: inputsValues['user-about']})
                                                .then(resolve);
                                          })
                                          promise.then(info => {
                                             userInfo.setUserInfo({name: info.name,
                                                about: info.about, avatar: info.avatar})
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
                                             getInfoFromServer.makeRequestChangeAvatar(inputValue['img-link'])
                                             .then(resolve)
                                          })
                                             promise.then((info) => {
                                                userInfo.setUserInfo({name: info.name,
                                                   about: info.about, avatar: info.avatar})
                                                avatarPopup.closePopup();
                                                avatarPopup.endLoading();
                                             })
                                             .catch(err => console.log(`Ответ аватара
                                             не пришел ${err}`))
});
avatarPopup.setEventListeners()

Promise.all([getInfoFromServer.makeRequestGetInfo('users/me'), getInfoFromServer.makeRequestGetInfo('cards')])
   .then(([userInformation, cardsInformation]) => {
      userId = userInformation._id
      userInfo.setUserInfo(userInformation)
      cardsInit.renderCards(cardsInformation)
   })
   .catch((err) => console.log(`Ответ не пришел ${err}`));

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