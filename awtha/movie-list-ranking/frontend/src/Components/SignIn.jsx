import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const server_url = 'http://10.0.0.209:11037';

function SignIn() {
  const [newUsername, setUsername] = useState();
  const [newPassword, setPassword] = useState();
  const [submit, setSubmit] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const nav = () => {
    navigate("/signup");
  };
  
  useEffect(() => {
    const Login = async () => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"username": newUsername,
                                      "password": newPassword
                                    })
            }
            if (newUsername !== '' && newUsername !== undefined) {
                const response = await fetch(server_url + '/signin', options);
                const data = await response.json();
                if(response.status === 200) {
                  localStorage.setItem("token", data.data);
                  localStorage.setItem("username", newUsername);
                  setUsername('');
                  setPassword('');
                  navigate('/');
                  window.location.reload();
                  console.log(localStorage);
                }
            }
        } catch (error) {
          console.error(error.message);
        }
    };

    // Call the Login function to check against user DB
    Login();
    // eslint-disable-next-line
}, [submit]);

  return (
    <div className="SignIn">
      <h1 className="Large">Welcome Back</h1>
      <h2 className="fix-h">Sign In</h2>
      <h2 className="fix-h">Username</h2>
      <input className="user" value={newUsername || ''} onChange={(event) => setUsername(event.target.value)}></input>
      <h2 className="fix-h">Password</h2>
      <input className="user" value={newPassword || ''} onChange={(event) => setPassword(event.target.value)}></input>
      <button className="submit" onClick={setSubmit}>Sign In</button>
      <div className="switch">
        <p onClick={nav}>Don't have an Account?</p>
      </div>
    </div>
  )
}

export default SignIn;