import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Chat({descendingOrderMessages, getUserMessages, getClickedUsersMessages}) {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const userId = cookies.UserId;

  const deleteMessage = async (messageId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/messages/${messageId}`);
      getUserMessages();
      getClickedUsersMessages();

    } catch (err) {
      console.log(err);
  }
};
  console.log(descendingOrderMessages);

  return (
    <>
    <div className='chat-display'>
      {descendingOrderMessages.map((message, index) => {
        return (
          <div key={index} className="chat-message-container">
             <div className="chat-message-header">
              <div className="img-container">
                <img src={message.img} alt={message.first_name} />
              </div>
              <div className="name-and-icon">
              <p className='chat-name'>{message.name}</p>
              {message.from_userId == userId && <FaTrash onClick={() => deleteMessage(message._id)} className='delete-message-icon'/>}
              </div>
             </div>
              <div className="chat-message">
                <p>{message.message}</p>
              </div>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default Chat