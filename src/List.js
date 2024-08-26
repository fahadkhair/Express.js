import React, { useState } from 'react';
import './List.css';

const List = () => {
    const [data, setData] = useState([]);
    const [email, setEmail] = useState([]);
    const [link, setLink] = useState([]);
    const [password, setPassword] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [emailData, setEmailData] = useState('');
    const [linkData, setLinkData] = useState('');
    const [newPass, setNewPass] = useState('');
    const [combinedData, setCombinedData] = useState([]);

    const handleAdd = async (event) => {
        event.preventDefault();

        const newCombinedData = [...combinedData, { name: newItem, email: emailData, link: linkData, password: newPass }];

        setData([...data, newItem]);
        setEmail([...email, emailData]);
        setLink([...link, linkData]);
        setPassword([...password, newPass]);
        setCombinedData(newCombinedData);

        // Send data to the server
        try {
            const response = await fetch("http://localhost:4000/save", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCombinedData),
            });

            if (response.ok) {
                alert('Data saved successfully');
            } else {
                alert('Failed to save data');
            }
        } catch (error) {
            alert('Error:', error);
        }

        setNewItem('');
        setEmailData('');
        setLinkData('');
        setNewPass('');
    };

    return (
        <div className='container'>
            <div className='contain'>
                <form onSubmit={handleAdd} >
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Enter Your Name"
                        className='form-input'
                    />
                    <input
                        type="text"
                        value={emailData}
                        onChange={(e) => setEmailData(e.target.value)}
                        placeholder="Enter Your Email"
                        className='form-input'
                    />
                    <input
                        type="text"
                        value={linkData}
                        onChange={(e) => setLinkData(e.target.value)}
                        placeholder="Enter Your Link"
                        className='form-input'
                    />
                    <input
                        type="text"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="Enter Your Password"
                        className='form-input'
                    />
                    <button type="submit" className="add-btn">Add</button>
                </form>
            </div>
        </div>
    );
};

export default List;
