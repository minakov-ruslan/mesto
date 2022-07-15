export default class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
  }

  setUserInfo(user) {
    this._userName.textContent = user.username;
    this._userInfo.textContent = user.about;
  }
}