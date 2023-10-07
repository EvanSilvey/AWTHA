import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const server_url = 'http://10.0.0.209:11037';

function SignUp() {
  const [newUsername, setUsername] = useState();
  const [newPassword, setPassword] = useState();
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const nav = () => {
    navigate("/signin");
  };
  
  useEffect(() => {
    const createUser = async () => {
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
                console.log(newUsername);
                const response = await fetch(server_url + '/users', options);
                const data = await response.json();
                console.log(data);
                navigate("/signin");
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            setError(error.message)
        }
    };

    // Call the createList function to fetch the lists
    createUser();
    // eslint-disable-next-line
}, [submit]);

  return (
    <div className="SignUp">
      <h1 className="Large">Welcome to Rankd</h1>
      <h2 className="fix-h">Sign Up</h2>
      <h2 className="fix-h">Username</h2>
      <input className="user" value={newUsername || ''} onChange={(event) => setUsername(event.target.value)}></input>
      <h2 className="fix-h">Password</h2>
      <input className="user" value={newPassword || ''} onChange={(event) => setPassword(event.target.value)}></input>
      <button className="submit" onClick={setSubmit}>Create Account</button>
      <div className="switch">
        <p onClick={nav}>Already have an Account?</p>
      </div>
    </div>
  )
}

export default SignUp;