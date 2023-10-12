import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logout from './Logout.jsx';

const Messenger = () => {
    const navigate = useNavigate();

    return (
        <div className='Messenger_Main_Container'>
            <nav className="Messenger_Navbar">
                <button type='button' onClick={() => {navigate('/dashboard')}}>Back to Dashboard</button>
                <Logout />
            </nav>
        </div>
    )
}

export default Messenger;