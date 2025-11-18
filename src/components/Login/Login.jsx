import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authWrapper/authContext.js';

function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [userdata, setUserdata] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

            if (!userdata.username || !userdata.password) {
                setError("Username and password are required");
                return;
            }
        //console.log(userdata);
        login(userdata.username);
        navigate('/posts');
    };
    return (
        <div className='flex flex-col max-w-96 gap-4 m-12'>
                        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
            <input
            placeholder='Username'
            className="border" 
            value={userdata.username} 
            onChange={(e) => setUserdata({...userdata, username: e.target.value})}> 
            </input>
            <input 
            placeholder='Password'
            type='password'
            className="border"
            value={userdata.password} 
            onChange={(e) => setUserdata({...userdata, password: e.target.value})}></input>
                        <button type="submit" style={{ backgroundColor: '#f59e0b', color: '#fff', padding: '0.5rem 2rem', borderRadius: '1rem' }}>
                            Login
                        </button>
                        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
            </form>
        </div>
    )
}
export default Login;
