export default class Api {
   constructor(infoForFetch) {
      this._infoForFetch = infoForFetch;
   }

   _checkResponse(res) {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка ${res.status}`);
   }

   makeRequestGetInfo(data) {
      console.log(`${this._infoForFetch.baseUrl}/${this._infoForFetch.cohortId}/${data}`)
      return fetch(`${this._infoForFetch.baseUrl}/${this._infoForFetch.cohortId}/${data}`, {
         headers: this._infoForFetch.headers
      })
      .then(this._checkResponse)
   }

   makeRequestChangeProfile({userName, about}) {
      console.log(this._infoForFetch.headers)
      return fetch(`${this._infoForFetch.baseUrl}/${this._infoForFetch.cohortId}/users/me`, {
         method: 'PATCH',
         headers: this._infoForFetch.headers,
         body: JSON.stringify({
            name: userName,
            about: about
         })
      })
      .then(this._checkResponse)
   }

   makeRequestAddPicture({pictureName, link}) {
      return fetch(`${this._infoForFetch.baseUrl}/${this._infoForFetch.cohortId}/cards`, {
         method: 'POST',
         headers: this._infoForFetch.headers,
         body: JSON.stringify({
            name: pictureName,
            link: link
         })
      })
      .then(this._checkResponse)
   }

   makeRequestDeleteCard(id) {
      return fetch(`${this._infoForFetch.baseUrl}/${this._infoForFetch.cohortId}/cards/${id}`, {
         method: 'DELETE',
         headers: this._infoForFetch.headers
      })
      .then(this._checkResponse)
   }

   makeRequestLike(id) {
      return fetch(`${this._infoForFetch.baseUrl}/${this._infoForFetch.cohortId}/cards/likes/${id}`, {
         method: 'PUT',
         headers: this._infoForFetch.headers
      })
      .then(this._checkResponse)
   }

   makeRequestDeleteLike(id) {
      return fetch(`${this._infoForFetch.baseUrl}/${this._infoForFetch.cohortId}/cards/likes/${id}`, {
         method: 'DELETE',
         headers: this._infoForFetch.headers
      })
      .then(this._checkResponse)
   }

   makeRequestChangeAvatar(avatar) {
      return fetch(`${this._infoForFetch.baseUrl}/${this._infoForFetch.cohortId}/users/me/avatar`, {
         method: 'PATCH',
         headers:this._infoForFetch.headers,
         body: JSON.stringify({
            avatar
         })
      })
      .then(this._checkResponse)
   }

}

