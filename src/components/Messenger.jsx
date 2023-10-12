import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Logout from './Logout.jsx';

import './Messenger.css';

const Messenger = () => {
    const navigate = useNavigate();
    const messageContainerRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
      }, [messages]);

    const handleSendMessage = () => {
        if (messageInput.trim() !== '') {
            setMessages([{ text: messageInput, sender: 'user' }, ...messages,]);
            setMessageInput('');
            // You can add logic to send the message to the server or recipient here.
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default behavior of the Enter key in a textarea or input.
            handleSendMessage();
        }
    };

    return (
        <div className='Messenger_Main_Container'>
            <nav className="Messenger_Navbar">
                <button type='button' onClick={() => {navigate('/dashboard')}}>Back to Dashboard</button>
                <Logout />
            </nav>
            <div className='Messenger_Chat'>
                <div className='Messenger_MessageContainer' ref={messageContainerRef}>
                    {messages.map((message, index) => (
                        <div key={index} className={`Message ${message.sender}`}>
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className='Messenger_MessageInput'>
                    <input
                        type='text'
                        placeholder='Type your message...'
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                            handleSendMessage()
                        }}}
                    />
                    <button type='button' id='Send_Message'onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Messenger;