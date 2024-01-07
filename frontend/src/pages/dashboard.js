import React, {useState} from 'react'
import ChatContainer from '../components/ChatContainer'
import TinderCard from 'react-tinder-card'
import '../style/index.scss';

function DashboardPage() {

  const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://i.imgur.com/NfgFwox.jpeg'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://example.com/erlich.jpg'
  },
  {
    name: 'Monica Hall',
    url: 'https://example.com/monica.jpg'
  },
  {
    name: 'Jared Dunn',
    url: 'https://example.com/jared.jpg'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://example.com/dinesh.jpg'
  }
]

  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }


  return (
    <>
    <div className="dashboard">
      <ChatContainer />
      <div className="swiper-container">
        <div className="card-container">
          {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}

        </div>
      </div>
    </div>
    </>
  )
}

export default DashboardPage