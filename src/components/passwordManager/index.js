import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../passwordItems'

import './index.css'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordItemsList: [],
    searchInput: '',
    passwordShow: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const updatedPasswordItemsList = {
        id: uuidv4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
      }
      this.setState(prevState => ({
        passwordItemsList: [
          ...prevState.passwordItemsList,
          updatedPasswordItemsList,
        ],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  getFilterList = () => {
    const {passwordItemsList, searchInput} = this.state
    const filteredPasswordList = passwordItemsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredPasswordList
  }

  showStatus = () => {
    this.setState(prevState => ({passwordShow: !prevState.passwordShow}))
  }

  onDelete = id => {
    const {passwordItemsList} = this.state
    const newPasswordItemList = passwordItemsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({
      passwordItemsList: newPasswordItemList,
    })
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordShow,
      searchInput,
    } = this.state
    const updatedResultList = this.getFilterList()
    const passwordCount = updatedResultList.length
    return (
      <div className="container">
        <div className="password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="password-input-search-container">
            <img
              className="password-manager-image"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
            <form
              onSubmit={this.onAddPassword}
              className="input-search-container"
            >
              <h1 className="heading">Add new Password</h1>
              <div className="input-search-box">
                <div className="logo-box">
                  <img
                    className="website-logo"
                    alt="website"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  />
                </div>
                <div className="input-logo">
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Website"
                    onChange={this.onChangeWebsite}
                    value={websiteInput}
                  />
                </div>
              </div>
              <div className="input-search-box">
                <div className="logo-box">
                  <img
                    className="website-logo"
                    alt="username"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  />
                </div>
                <div className="input-logo">
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter username"
                    onChange={this.onChangeUserName}
                    value={usernameInput}
                  />
                </div>
              </div>
              <div className="input-search-box">
                <div className="logo-box">
                  <img
                    className="website-logo"
                    alt="password"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  />
                </div>
                <div className="input-logo">
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter password"
                    onChange={this.onChangePassword}
                    value={passwordInput}
                  />
                </div>
              </div>
              <div className="button-container">
                <button className="add-button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="password-details-container">
            <div className="text-image-input-container">
              <div className="text-and-count-container">
                <h1 className="password-item-heading">Your Passwords</h1>
                <div className="count-container">
                  <p className="count">{passwordCount}</p>
                </div>
              </div>
              <div className="password-item-search-container">
                <div className="logo-box1">
                  <img
                    className="search"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                  />
                </div>
                <div className="input-logo">
                  <input
                    className="input"
                    type="search"
                    placeholder="search"
                    onChange={this.onChangeSearchInput}
                    value={searchInput}
                  />
                </div>
              </div>
            </div>
            <hr className="line" />
            <div className="check-box-container">
              <input
                id="checkbox"
                className="check"
                type="checkbox"
                onChange={this.showStatus}
                value={passwordShow}
              />
              <label className="show-password" htmlFor="checkbox">
                Show Passwords
              </label>
            </div>
            {updatedResultList.length === 0 ? (
              <div className="no-password-container">
                <img
                  className="password-manager-image"
                  alt="no passwords"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                />
                <p className="no-passwords-text">No Passwords</p>
              </div>
            ) : (
              <ul className="output-list-container">
                {updatedResultList.map(eachItem => (
                  <PasswordItem
                    passwordDetails={eachItem}
                    key={eachItem.id}
                    onDelete={this.onDelete}
                    showStatus={passwordShow}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
