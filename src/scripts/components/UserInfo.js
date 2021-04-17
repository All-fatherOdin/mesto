export default class UserInfo{
   constructor({userNameSelector, userInfoSelector}){
      this._userName = document.querySelector(userNameSelector);
      this._userCareer = document.querySelector(userInfoSelector);
   }

   getUserInfo(){
      const userInfoValues = {name: this._userName.textContent, about: this._userCareer.textContent};
      return userInfoValues;
   }

   setUserInfo({name, about}){
      this._userName.textContent = name;
      this._userCareer.textContent = about;
   }
}