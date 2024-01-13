import React from 'react'

function Chat({descendingOrderMessages}) {


  return (
    <>
    <div className='chat-display'>
      {descendingOrderMessages.map((message, index) => {
        return (
          <div key={index}>
             <div className="chat-message-header">
              <div className="img-container">
                <img src={message.img} alt={message.first_name} />
              </div>
              <p>{message.name}</p>
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