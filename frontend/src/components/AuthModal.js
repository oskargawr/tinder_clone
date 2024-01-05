import React from 'react'
import AuthModalForm from './AuthModalForm';


function AuthModal({setShowModal}) {
    const handleClick = () => {
        setShowModal(false)
    }

    const isSignUp = true;



  return (
    <div className="auth-modal-wrapper">
      <div className='auth-modal'>
          <div onClick={handleClick} className='close-icon'>ⓧ</div>
          <h2 className=''> {isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
          <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cook</p>
          <AuthModalForm />
        <hr />
      </div>
    </div>
  )
}

export default AuthModal