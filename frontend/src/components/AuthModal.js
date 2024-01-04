import React from 'react'

function AuthModal({setShowModal}) {
    const handleClick = () => {
        setShowModal(false)
    }
  return (
    <div className="auth-modal-wrapper">
      <div className='auth-modal'>
          <div onClick={handleClick}>ⓧ</div>
          AUTH MODAL
      </div>
    </div>
  )
}

export default AuthModal