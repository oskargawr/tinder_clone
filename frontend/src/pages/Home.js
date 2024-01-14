import React, {useState, useEffect} from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal';
import AuthModalForm from '@/components/AuthModalForm';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'


function HomePage() {
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [authToken, setAuthToken] = useState(false);
  
    const handleClick = () => {
      if (authToken) {
            removeCookie('UserId', cookies.UserId);
            removeCookie('AuthToken', cookies.AuthToken);
            window.location.reload();
            setAuthToken(false);
        }
        setShowModal(true);
        setIsSignUp(true);

        
    }

    useEffect(() => {
        setAuthToken(cookies.AuthToken || false);
    }, []);

  return (
    <>
    <div className="overlay">
    <Nav 
      authToken={authToken}
      minimal={false}
      setShowModal={setShowModal}
      showModal={showModal}
      setIsSignUp={setIsSignUp}
      />
      
    <div className='home'>
        <h1 className='primary-title'>Swipe Right</h1>
        {!showModal && (
        <button className='primary-button' onClick={handleClick}>
            {authToken !== false ? 'Signout' : 'Create account'}
        </button>
        )}

        {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>}
    </div>
    </div>
    </>
  )
}

export default HomePage