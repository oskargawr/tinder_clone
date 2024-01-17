import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import ChatContainer from '../components/ChatContainer'
import TinderCard from 'react-tinder-card'
import '../style/index.scss';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AuthProvider } from '../context/AuthContext.jsx';


function DashboardPage() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState()

  const hadCalledGetGenderedUsers = useRef(false);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:8000/get_user', {
        params: { userId }
      });
      setUser(res.data)
    } catch (err) {
      console.error(err);
    }
  }

  const getGenderedUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/gendered_users', {
        params: { gender: user?.gender_interest }
      });
      setGenderedUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useLayoutEffect(() => {
    getUser();
  }, []);

  useLayoutEffect(() => {
    if (user && !hadCalledGetGenderedUsers.current) {
      getGenderedUsers();
      hadCalledGetGenderedUsers.current = true;
    }
  }, [user]);

  const updateMatches = async (matchedUserId) => {
    try {
      const res = await axios.put('http://localhost:8000/add_match', {
        userId,
        matchedUserId
      });
      getUser();
    } catch (err) {
      console.error(err);
    }
  }

  const swiped = (direction, swipedUserId) => {
    if (direction === 'right') {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const matchedUserIds = user?.matches?.map(({user_id}) => user_id).concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUsers => !matchedUserIds.includes(genderedUsers.user_id)
  )

  return (
    <>
    { user &&
    <div className="dashboard">
      <ChatContainer user={user} getUser={getUser} getGenderedUsers={getGenderedUsers} genderedUsers={genderedUsers}/>
      <div className="swipe-container">
        <div className="card-container">
          {filteredGenderedUsers?.map((character) =>
          <TinderCard 
          className='swipe' 
          key={character.user_id} 
          onSwipe={(dir) => swiped(dir, character.user_id)} 
          onCardLeftScreen={() => outOfFrame(character.first_name)}>
            <div style={{ backgroundImage: 'url(' + character.img_url + ')' }} className='card'>
            </div>
            <div className="card-info-content">
            <h3>{character.first_name} {character.last_name}</h3>
            <p className='location'>{character.location}</p>
            <p className='about'>{character.about}</p>
            </div>
          </TinderCard>
        )}
        <div className="swipe-info">
          {lastDirection ? <h2 className="info-text">You swiped {lastDirection}</h2> : <h2 className="info-text">Swipe a card or press a button to get started!</h2>}
        </div>
        </div>
      </div>
    </div>
}
    </>
  )
}

const DashboardWithAuth = () => (
  <AuthProvider>
    <DashboardPage />
  </AuthProvider>
)

export default DashboardWithAuth;