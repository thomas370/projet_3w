import React, { useState } from 'react';
import style from './Register.module.scss';
import ButtonReturn from "../../components/Button_return/ButtonReturn";

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');

        if (!userData.username || !userData.email || !userData.password || !userData.confirmPassword) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userData.username,
                    email: userData.email,
                    password: userData.password
                })
            });

            if (response.status === 201) {
                alert('Successfully registered!');
            } else if (response.status === 409) {
                const data = await response.json();
                setErrorMessage(data.error || 'Email already in use.');
            } else {
                const data = await response.json();
                alert(data.error || 'Error registering user');
            }
        } catch (error) {
            console.error("Error in /register:", error.message);
            alert("Error registering user");
        }
    };

    return (
        <div className={style.Register}>
            <ButtonReturn />
            <form onSubmit={handleSubmit}>
                <h1>register</h1>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                />
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                />
                <button type="submit">Register</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Register;