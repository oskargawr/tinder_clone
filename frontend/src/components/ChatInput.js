import React, {useState} from 'react'

function ChatInput() {
    const [textArea, setTextArea] = useState(null)
  return (
    <div className="chat-input">
        <textarea name="" id="" cols="30" rows="10" onChange={(e) => setTextArea(e.target.value)}></textarea>
        <button className='secondary-button'>Submit</button>
    </div>
  )
}

export default ChatInput