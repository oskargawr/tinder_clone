import React from 'react'
import Nav from '../components/Nav'

function HomePage() {
    const authToken = false;

    const handleClick = () => {
        console.log('clicked')
    }

  return (
    <>
    <Nav minimal={false}/>
    <div className='home'>
        <h1>Swipe Right</h1>
        <button className='primary-button' onClick={handleClick}>
            {authToken ? 'Signout' : 'Create account'}
        </button>
    </div>
    </>
  )
}

export default HomePage