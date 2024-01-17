import React from 'react'
// import whiteLogo from '../images/tinder_logo_white.png';
import whiteLogo from '../images/Daco_1866030.png';
// import colorLogo from "../images/color-logo-tinder.png";
import colorLogo from "../images/Daco_5943364.png";
import Image from 'next/image'

function Nav({authToken, minimal, setShowModal, showModal, setIsSignUp}) {

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }

  return (
    <nav>
        <div className="logo-container">
        <Image
            className="logo"
            width={170}
            src={minimal ? colorLogo : whiteLogo}
            alt="logo"
        />
        </div>

        {!authToken && !minimal  && <button className='nav-button' onClick={handleClick} disabled={showModal}>Log in</button>}
    </nav>
  )
}

export default Nav