export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
  }

  setUserInfo(user) {
    this._userName.textContent = user.name;
    this._userInfo.textContent = user.about;
  }

  setUserAvatar(user) {
    this._userAvatar.src = user.avatar;
  }
}