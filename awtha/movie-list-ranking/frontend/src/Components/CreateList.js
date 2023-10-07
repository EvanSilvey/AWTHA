import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const server_url = 'http://10.0.0.209:11037';

function CreateList(props) {
    const [newTitle, setTitle] = useState();
    const [newDesc, setDesc] = useState();
    const [submit, setSubmit] = useState(false);

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    useEffect(() => {
        const getUserID = async () => {
            try {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"username": username})
                }
                const response = await fetch(server_url + '/users/one', options);
                const data = await response.json();
                console.log(data);
                console.log('leaving getUSerID');
                console.log(username);
                return data;
            } catch (error) {
                console.error('Error creating list:', error);
            }
        }

        const createList = async () => {
            try {
                const userID = await getUserID();
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"user": userID,
                                          "title": newTitle,
                                          "text": newDesc
                                        })
                }
                console.log(newTitle);
                if (newTitle.localeCompare('')) {
                    const response = await fetch(server_url + '/lists', options);
                    const data = await response.json();
                    console.log(data);
                    navigate("/lists");
                    props.setReset(response);
                    setTitle('');
                    setDesc('');
                }
            } catch (error) {
                console.error('Error creatin list:', error);
            }
        };
    
        // Call the createList function to fetch the lists
        createList();
        // eslint-disable-next-line
    }, [submit]);

    return (
      <div className="CreateList">
        <h1 className="Large">Create List</h1>
        <h2>Title</h2>
        <input className="title" value={newTitle || ''} onChange={(event) => setTitle(event.target.value)}></input>
        <h2>Description</h2>
        <textarea className="desc" value={newDesc || ''} onChange={(event) => setDesc(event.target.value)}></textarea>
        <button onClick={setSubmit}>Create List</button>
      </div>
    )
}

export default CreateList;