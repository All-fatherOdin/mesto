export default class UserInfo {
   constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
      this._userName = document.querySelector(userNameSelector);
      this._userCareer = document.querySelector(userInfoSelector);
      this._userAvatar = document.querySelector(userAvatarSelector)
   }

   getUserInfo() {
      const userInfoValues = { name: this._userName.textContent, about: this._userCareer.textContent };
      return userInfoValues;
   }

   setUserInfo({ name, about, avatar }) {
      this._userName.textContent = name;
      this._userCareer.textContent = about;
      this._userAvatar.src = avatar;
   }
}