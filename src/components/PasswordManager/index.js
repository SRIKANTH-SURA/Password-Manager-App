import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isChecked: false,
  }

  onToggleCheckbox = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  getSearchedPasswordList = () => {
    const {passwordList, searchInput} = this.state
    const searchResults = passwordList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeletePassword = id => {
    // const {passwordList} = this.state
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    }))
  }

  onClickAddBtn = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initialBackgroundColorClassName = `website-logo ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    if ((website !== '', username !== '', password !== '')) {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
        initialClassName: initialBackgroundColorClassName,
      }
      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newPassword],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  renderNoPasswordScreen = () => (
    <div className="no-password-container">
      <img
        className="no-passwords-img"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p className="no-password-title">No Passwords</p>
    </div>
  )

  renderPasswordList = searchPasswordList => {
    const {isChecked} = this.state

    return (
      <ul className="passwords-list">
        {searchPasswordList.map(eachPassword => (
          <PasswordItem
            key={eachPassword.id}
            passwordDetails={eachPassword}
            onDeletePassword={this.onDeletePassword}
            isChecked={isChecked}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {website, username, password, searchInput} = this.state
    const searchPasswordList = this.getSearchedPasswordList()
    return (
      <div className="password-manager-app">
        <div className="app-content">
          <div className="app-logo-container">
            <img
              className="app-logo-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
            />
          </div>
          <div className="addPassword-section">
            <div className="app-image-container">
              <img
                className="app-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
              />
            </div>
            <div className="addPassword-form-container">
              <form className="addPassword-form">
                <h1 className="form-heading">Add New Password</h1>
                <div className="form-field">
                  <img
                    className="form-field-logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                  <input
                    className="user-input"
                    type="text"
                    placeholder="Enter Website"
                    value={website}
                    onChange={this.onChangeWebsite}
                  />
                </div>
                <div className="form-field">
                  <img
                    className="form-field-logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                  <input
                    className="user-input"
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="form-field">
                  <img
                    className="form-field-logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                    alt="password"
                  />
                  <input
                    className="user-input"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="form-btn">
                  <button
                    className="add-btn"
                    type="submit"
                    onClick={this.onClickAddBtn}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="saved-passwords-section">
            <div className="your-passwords">
              <h1 className="your-password-title">
                Your Passwords
                <p className="passwords-count">{searchPasswordList.length}</p>
              </h1>
              <div className="search-field">
                <img
                  className="search-field-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <div className="show-password-checkbox">
              <input
                className="checkbox"
                type="checkbox"
                id="checkbox"
                onChange={this.onToggleCheckbox}
              />
              <label className="checkbox-label" htmlFor="checkbox">
                Show Passwords
              </label>
            </div>
            {searchPasswordList.length === 0
              ? this.renderNoPasswordScreen()
              : this.renderPasswordList(searchPasswordList)}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
