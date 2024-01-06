import React, {useState} from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal';
import AuthModalForm from '@/components/AuthModalForm';


function HomePage() {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

  const authToken = false;



    const handleClick = () => {
        console.log('clicked')
        setShowModal(true);
        setIsSignUp(true);
    }

  return (
    <>
    <div className="overlay">
    <Nav minimal={false}
      setShowModal={setShowModal}
      showModal={showModal}
      setIsSignUp={setIsSignUp}
      />
      
    <div className='home'>
        <h1 className='primary-title'>Swipe Right</h1>
        {!showModal && <button className='primary-button' onClick={handleClick}>
            {authToken ? 'Signout' : 'Create account'}
        </button>}

        {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>}

    </div>
    </div>
    </>
  )
}

export default HomePage