import React from 'react'
import whiteLogo from '../images/tinder_logo_white.png';
import colorLogo from "../images/color-logo-tinder.png";
import Image from 'next/image'

function Nav({minimal, authToken}) {

  return (
    <nav>
        <div className="logo-container">
        <Image
            className="logo"
            src={minimal ? colorLogo : whiteLogo}
            alt="logo"
        />
        </div>

        {!authToken && !minimal  && <button className='nav-button'>Log in</button>}
    </nav>
  )
}

export default Nav