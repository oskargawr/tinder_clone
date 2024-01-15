import React from 'react'
import AuthModalForm from './AuthModalForm';
import { IoIosCloseCircleOutline } from "react-icons/io";


function AuthModal({setShowModal, setIsSignUp, isSignUp}) {
    const handleClick = () => {
        setShowModal(false)
    }

  return (
    <div className="auth-modal-wrapper">
      <div className='auth-modal'>
          <div onClick={handleClick} className='close-icon'>
            <IoIosCloseCircleOutline style={{ fontSize: '24px'}} />
          </div>
          <h2 className=''> {isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
          <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cook</p>
          <AuthModalForm isSignUp={isSignUp}/>
        <hr />
      </div>
    </div>
  )
}

export default AuthModal