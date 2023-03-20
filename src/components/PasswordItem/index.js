import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeletePassword, isChecked} = props
  const {id, website, username, password, initialClassName} = passwordDetails
  const websiteLogo = website[0]
  const onClickDeleteBtn = () => {
    onDeletePassword(id)
  }
  const hiddenPassword = () => (
    <img
      className="star-image"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  return (
    <li className="password-item">
      <div className="password-details-container">
        <p className={initialClassName}>{websiteLogo}</p>
        <div className="password-details">
          <p className="website-name">{website}</p>
          <p className="username">{username}</p>
          <p className="password">{isChecked ? password : hiddenPassword()}</p>
        </div>
      </div>
      <div className="delete-img-container">
        <button
          className="delete-btn"
          type="button"
          data-testid="delete"
          onClick={onClickDeleteBtn}
        >
          <img
            className="delete-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
