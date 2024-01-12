import React, {useState, useEffect, useRef} from 'react'
import ChatContainer from '../components/ChatContainer'
import TinderCard from 'react-tinder-card'
import '../style/index.scss';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AuthProvider } from '../context/AuthContext.js';


function DashboardPage() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState()

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
      // console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user]);


  console.log(genderedUsers)


  const db = [
  {
    first_name: 'Agata Bartczak',
    img_url: 'https://i.ibb.co/LSLZBBt/agata.jpg'
  },
  {
    first_name: 'Szymon Grabski',
    img_url: 'https://i.ibb.co/rckDXbC/szymon.jpg'
  },
  {
    first_name: 'Sebastian Jablonski',
    img_url: 'https://i.ibb.co/VLz0y1r/62-A18-AEE-8-ABB-4661-B7-FC-96818-CC50-DD1.jpg'
  },
  {
    first_name: 'Oskar Gawryszewski',
    img_url: 'https://i.ibb.co/2jSp1WW/65-B4-A638-923-B-4-E07-9-FA2-E29-F74-C8129-F.jpg'
  },

]

  const characters = genderedUsers;

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

  const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUsers => !matchedUserIds.includes(genderedUsers.user_id)
  )

  // console.log("gendered users: ", genderedUsers);
  // console.log("filtered gendered users: ", filteredGenderedUsers);

  return (
    <>
    { user &&
    <div className="dashboard">
      <ChatContainer user={user}/>
      <div className="swipe-container">
        <div className="card-container">
          {filteredGenderedUsers?.map((character) =>
          <TinderCard 
          className='swipe' 
          key={character.user_id} 
          onSwipe={(dir) => swiped(dir, character.user_id)} 
          onCardLeftScreen={() => outOfFrame(character.first_name)}>
            <div style={{ backgroundImage: 'url(' + character.img_url + ')' }} className='card'>
              <h3>{character.first_name}</h3>
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