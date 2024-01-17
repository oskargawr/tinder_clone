import React, {useState} from 'react'
import { FaTrash } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { MdEdit } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";


import axios from 'axios';

function Chat({descendingOrderMessages, getUserMessages, getClickedUsersMessages}) {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [clickedMessage, setClickedMessage] = useState(""); // [message, setMessage
  const [showEditMessageInput, setShowEditMessageInput] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");
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

  const editMessage = (currentMessage) => {
    setEditedMessage(currentMessage.message);
    setClickedMessage(currentMessage._id);
    setShowEditMessageInput(true);
  }

  const submitEditedMessage = async (messageId) => {
    try {
      const res = await axios.put(`http://localhost:8000/messages/${messageId}`, {message: editedMessage});
      console.log(res.data);
      getUserMessages();
      getClickedUsersMessages();

    } catch (err) {
      console.log(err);
  }
  setShowEditMessageInput(false);
  }

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
              {message.from_userId == userId && 
              <div className="message-icons">
                <FaTrash onClick={() => deleteMessage(message._id)} className='delete-message-icon'/>
                <MdEdit className='delete-message-icon' onClick={() => editMessage(message)}/>
              </div>
              }
              </div>
             </div>
              <div className="chat-message">
                {showEditMessageInput && message._id === clickedMessage && message.from_userId == userId ? (
                  <div className='edit-message-actions'>
                    <input type="text" value={editedMessage} onChange={(e) => setEditedMessage(e.target.value)} />
                    <IoIosCloseCircleOutline onClick={() => setShowEditMessageInput(false)} className='close-icon'/>
                    <button type="submit" onClick={() => submitEditedMessage(message._id)}>edit</button>
                  </div>
                ) : (
                  <p>{message.message}</p>
                )}
              </div>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default Chat