import React, {useState} from 'react'
import axios from 'axios';

function ChatInput({user, clickedUser, getUserMessages, getClickedUsersMessages}) {
    const [textArea, setTextArea] = useState(null)
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;

    const sendMessage = async () => {
      console.log("klikam");
      const message = {
              timestamp: new Date().toISOString(),
              from_userId: userId,
              to_userId: clickedUserId,
              message: textArea
            }
        try {
            await axios.post('http://localhost:8000/message', message);
            getUserMessages();
            getClickedUsersMessages();
            setTextArea('');

        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className="chat-input">
        <textarea name="" id="" cols="30" rows="10" onChange={(e) => setTextArea(e.target.value)}></textarea>
        <button className='secondary-button' onClick={sendMessage}>Submit</button>
    </div>
  )
}

export default ChatInput