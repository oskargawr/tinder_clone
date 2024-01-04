import React from 'react'
import whiteLogo from '../images/tinder_logo_white.png';
import colorLogo from "../images/color-logo-tinder.png";
import Image from 'next/image'

function Nav({minimal, authToken, setShowModal, showModal}) {

  const handleClick = () => {
    setShowModal(true)
  }

  return (
    <nav>
        <div className="logo-container">
        <Image
            className="logo"
            src={minimal ? colorLogo : whiteLogo}
            alt="logo"
        />
        </div>

        {!authToken && !minimal  && <button className='nav-button' onClick={handleClick} disabled={showModal}>Log in</button>}
    </nav>
  )
}

export default Nav