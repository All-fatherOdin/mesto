export default class Api {
   constructor(infoForFetch) {
      this._baseUrl = infoForFetch.baseUrl;
      this._cohortId = infoForFetch.cohortId;
      this._headers = infoForFetch.headers;
   }

   _checkResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
   }

   getInfo(data) {
      console.log(`${this._baseUrl}/${this._cohortId}/${data}`)
      return fetch(`${this._baseUrl}/${this._cohortId}/${data}`, {
         headers: this._headers
      })
      .then(this._checkResponse)
   }

   changeProfile({userName, about}) {
      return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            name: userName,
            about: about
         })
      })
      .then(this._checkResponse)
   }

   addPicture({pictureName, link}) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            name: pictureName,
            link: link
         })
      })
      .then(this._checkResponse)
   }

   deleteCard(id) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards/${id}`, {
         method: 'DELETE',
         headers: this._headers
      })
      .then(this._checkResponse)
   }

   setLike(id) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${id}`, {
         method: 'PUT',
         headers: this._headers
      })
      .then(this._checkResponse)
   }

   deleteLike(id) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${id}`, {
         method: 'DELETE',
         headers: this._headers
      })
      .then(this._checkResponse)
   }

   changeAvatar(avatar) {
      return fetch(`${this._baseUrl}/${this._cohortId}/users/me/avatar`, {
         method: 'PATCH',
         headers:this._headers,
         body: JSON.stringify({
            avatar
         })
      })
      .then(this._checkResponse)
   }
}

