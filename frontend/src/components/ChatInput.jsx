import React, {useState} from 'react'
import axios from 'axios';
import { LuSend } from "react-icons/lu";

function ChatInput({user, clickedUser, getUserMessages, getClickedUsersMessages}) {
    const [textArea, setTextArea] = useState('')
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;

    const sendMessage = async () => {
      const message = {
              timestamp: new Date().toISOString(),
              from_userId: userId,
              to_userId: clickedUserId,
              message: textArea
            }
        try {

          if (message.message.length !== 0) {
            await axios.post('http://localhost:8000/message', message);
            getUserMessages();
            getClickedUsersMessages();
            setTextArea('');
          }

        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className="chat-input">
        <textarea name="" id="" cols="30" rows="10" onChange={(e) => setTextArea(e.target.value)} value={textArea}></textarea>
        <button className='secondary-button' onClick={sendMessage}>send</button>
    </div>
  )
}

export default ChatInput