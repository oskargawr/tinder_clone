import React, {useState} from 'react'
import ChatContainer from '../components/ChatContainer'
import TinderCard from 'react-tinder-card'
import '../style/index.scss';

function DashboardPage() {

  const db = [
  {
    name: 'Agata Bartczak',
    url: 'https://i.ibb.co/LSLZBBt/agata.jpg'
  },
  {
    name: 'Szymon Grabski',
    url: 'https://i.ibb.co/rckDXbC/szymon.jpg'
  },
  {
    name: 'Sebastian Jablonski',
    url: 'https://i.ibb.co/VLz0y1r/62-A18-AEE-8-ABB-4661-B7-FC-96818-CC50-DD1.jpg'
  },
  {
    name: 'Oskar Gawryszewski',
    url: 'https://i.ibb.co/2jSp1WW/65-B4-A638-923-B-4-E07-9-FA2-E29-F74-C8129-F.jpg'
  },

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
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) =>
          <TinderCard 
          className='swipe' 
          key={character.name} 
          onSwipe={(dir) => swiped(dir, character.name)} 
          onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
        <div className="swipe-info">
          {lastDirection ? <h2 className="info-text">You swiped {lastDirection}</h2> : <h2 className="info-text">Swipe a card or press a button to get started!</h2>}
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default DashboardPage