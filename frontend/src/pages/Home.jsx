import React, {useState, useEffect} from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal';
import AuthModalForm from '@/components/AuthModalForm';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'
import { CiSaveDown2 } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";
import axios from 'axios';


function HomePage() {
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [authToken, setAuthToken] = useState(false);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [saveMessage, setSaveMessage] = useState('Saved!');

    const userId = cookies.UserId;
  
    const handleClick = () => {
      if (authToken) {
            removeCookie('UserId', cookies.UserId);
            removeCookie('AuthToken', cookies.AuthToken);
            setAuthToken(false);
        } else {
          setShowModal(true);
          setIsSignUp(true);
        }

        
    }

    useEffect(() => {
        setAuthToken(cookies.AuthToken || false);
    }, []);

    const handleSave = async () => {
      try {
        const user = await axios.get('http://localhost:8000/get_user', {
          params: { userId }
        });

        const jsonData = JSON.stringify(user.data);
        const blob = new Blob([jsonData], {type: 'application/json'});

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);

        a.download = 'user_data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

      } catch (err) {
        console.error(err);
      }
    }

    const handleLoadClick = () => {
      document.getElementById('fileInput').click();
    }

const handleLoad = async (event) => {
  try {
    const file = event.target.files[0];
    const reader = new FileReader();

    try {
      reader.addEventListener('load', async (event) => {
        const user = JSON.parse(reader.result);

        const res = await axios.post('http://localhost:8000/load_user', {
          user
        });

        const sukces = res.status === 200;

        if (sukces) {
          setSaveMessage('Loaded!');
        } else {
          setSaveMessage('Failed!');
        }
      });
    } catch (err) {
      console.error(err);
    }

    reader.readAsText(file);
    setShowSaveMessage(true);
  } catch (err) {
    console.error(err);
  }
};

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
        {!showModal && authToken === false && (
          <div>
        <button className='primary-button' onClick={handleLoadClick}>
            Load account
        </button>
        <input type="file" id="fileInput" accept=".json" onChange={handleLoad} style={{ display: 'none' }} />
        </div>
        )}
        {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>}
        { authToken !== false && (
          <div>
            <button className="primary-button">
              <CiSaveDown2 style={{ fontSize: '16px'}} onClick={handleSave}/>
            </button>
          </div>
        )}
        {showSaveMessage && (
          <div className="save-message">
            <p style={{fontWeight: 700, fontSize: '1.5em', color: 'white'}}>{saveMessage}</p>
          </div>
        )}
    </div>
    </div>
    </>
  )
}

export default HomePage