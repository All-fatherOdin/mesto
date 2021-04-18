export default class Api {
   constructor({baseUrl, cohortId, token, headers}) {
      this._cohortId = cohortId;
      this._token = token;
      this._baseUrl = baseUrl;
      this._headers = headers;
   }

   _checkResponse(res) {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка ${res.status}`);
   }

   makeRequestGetInfo(data) {
      return fetch(`${this._baseUrl}/${this._cohortId}/${data}`, {
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         }
      })
      .then(this._checkResponse)
   }

   makeRequestChangeProfile({userName, about}) {
      return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
         method: 'PATCH',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: userName,
            about: about
         })
      })
      .then(this._checkResponse)
   }

   makeRequestAddPicture({pictureName, link}) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
         method: 'POST',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: pictureName,
            link: link
         })
      })
      .then(this._checkResponse)
   }

   makeRequestDeleteCard(id) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards/${id}`, {
         method: 'DELETE',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         }
      })
      .then(this._checkResponse)
   }

   makeRequestLike(id) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${id}`, {
         method: 'PUT',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         }
      })
      .then(this._checkResponse)
   }

   makeRequestDeleteLike(id) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${id}`, {
         method: 'DELETE',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         }
      })
      .then(this._checkResponse)
   }

   makeRequestChangeAvatar(avatar) {
      return fetch(`${this._baseUrl}/${this._cohortId}/users/me/avatar`, {
         method: 'PATCH',
         headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            avatar
         })
      })
      .then(this._checkResponse)
   }

}

