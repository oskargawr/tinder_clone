import React, {useState, useEffect} from 'react'
import Chat from './Chat';
import ChatInput from './ChatInput';
import axios from 'axios';

function ChatDisplay({user, clickedUser}) {
  const [userMessages, setUserMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

    const getUserMessages = async () => {
    try {
      const res = await axios.get('http://localhost:8000/messages', {
        params: { userId: userId, correspondingUserId: clickedUserId  }
      });
      setUserMessages(res.data);
    } catch (err) {
      console.log(err);
  }
}

  const getClickedUsersMessages = async () => {
    try {
      const res = await axios.get('http://localhost:8000/messages', {
        params: { userId: clickedUserId, correspondingUserId: userId  }
      });
      setClickedUsersMessages(res.data);
    } catch (err) {
      console.log(err);
  }
}
  
  useEffect(() => {
    getUserMessages();
    getClickedUsersMessages();
  }, []);

  const messages = [];

  userMessages?.forEach(message => {
    const formatedMessage = {}
    formatedMessage['name'] = user?.first_name;
    formatedMessage['img'] = user?.img_url;
    formatedMessage['message'] = message.message;
    formatedMessage['timestamp'] = message.timestamp;

    messages.push(formatedMessage);
  });

  clickedUsersMessages?.forEach(message => {
    const formatedMessage = {}
    formatedMessage['name'] = clickedUser?.first_name;
    formatedMessage['img'] = clickedUser?.img_url;
    formatedMessage['message'] = message.message;
    formatedMessage['timestamp'] = message.timestamp;

    messages.push(formatedMessage);
  });

  console.log("messages: ", userMessages, clickedUsersMessages);

  console.log("message timestamp: ", messages.timestamp);
  console.log("messages: ", messages)
  const descendingOrderMessages = messages.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  console.log("descending: ", descendingOrderMessages);

  return (
    <>
        <Chat descendingOrderMessages={descendingOrderMessages}/>
        <p>{clickedUser.first_name}</p>
        <ChatInput user={user} clickedUser={clickedUser} getUserMessages={getUserMessages} getClickedUsersMessages={getClickedUsersMessages}/>
    </>
  )
}

export default ChatDisplay