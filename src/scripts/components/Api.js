export default class Api {
   constructor({cohortId, token}) {
      this._cohortId = cohortId;
      this._token = token;
   }

   makeRequestGetInfo(data) {
      return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/${data}`, {
         headers: {
            authorization: `${this._token}`
         }
      })
         .then(res => res.json())
   }

   makeRequestChangeProfile({userName, about}){
      return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
         method: 'PATCH',
         headers: {
            authorization: `${this._token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: userName,
            about: about
         })
      })
         .then(res => res.json())
   }

   makeRequestAddPicture({pictureName, link}){
      return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
         method: 'POST',
         headers: {
            authorization: `${this._token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: pictureName,
            link: link
         })
      })
         .then(res => res.json())
   }

   makeRequestDeleteCard(id){
      return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}`, {
         method: 'DELETE',
         headers: {
            authorization: `${this._token}`,
         }
      })
         .then(res => res.json())
   }

   makeRequestLike(id){
      return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/likes/${id}`, {
         method: 'PUT',
         headers: {
            authorization: `${this._token}`,
         }
      })
         .then(res => res.json())
   }

   makeRequestDeleteLike(id){
      return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/likes/${id}`, {
         method: 'DELETE',
         headers: {
            authorization: `${this._token}`,
         }
      })
         .then(res => res.json())
   }

   makeRequestChangeAvatar(avatar){
      return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar`, {
         method: 'PATCH',
         headers: {
            authorization: `${this._token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            avatar
         })
      })
         .then(res => res.json())
   }

}

