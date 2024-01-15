import React from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { CiLogout } from "react-icons/ci";
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import axios from 'axios';

function ChatHeader({user}) {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const router = useRouter();

  const logout = () => {
    removeCookie('UserId', cookies.UserId);
    removeCookie('AuthToken', cookies.AuthToken);
    router.push('/');
  }

  const deleteAccount = () => {
    axios.delete(`http://localhost:8000/delete_user/${user.user_id}`)
    .then(res => {
      console.log(res);
      logout();
    })
    .catch(err => console.log(err));
  }

  const editAccount = () => {
     console.log('edit account'); 
    }
  return (
    <div className="chat-container-header">
        <div className="profile">
            <div className="img-container">
                <img src={user.img_url} alt="abc" />
            </div>
            <h3>Hello, {user.first_name}!</h3>
        </div>
        <div className="action-buttons">
          <i className="log-out-icon" onClick={logout}>
              <CiLogout style={{ fontSize: '24px'}} />
          </i>
          <i className="delete-account-icon" onClick={deleteAccount}>
              <FaTrash style={{ fontSize: '24px'}} />
          </i>
          <i className="edit-account-info" onClick={editAccount}>
              <MdEdit style={{ fontSize: '24px'}} />
          </i>
        </div>
    </div>
  )
}

export default ChatHeader