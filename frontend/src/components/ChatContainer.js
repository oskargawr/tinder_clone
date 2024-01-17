import React, {useState} from 'react'
import ChatHeader from './ChatHeader';
import MatchesDisplay from './MatchesDisplay';
import ChatDisplay from './ChatDisplay';

function ChatContainer({user, getUser, getGenderedUsers}) {
  const [clickedUser, setClickedUser] = useState(null);

  console.log("clicked user: ", clickedUser)
  return (
    <div className="chat-container">
        <ChatHeader user={user} getUser={getUser} getGenderedUsers={getGenderedUsers}/>

        <div className='matches-chat-buttons'>
            <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
            <button className="option" disabled={!clickedUser}>Chat</button>
        </div>

        {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}

        {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
    </div>
  )
}

export default ChatContainer