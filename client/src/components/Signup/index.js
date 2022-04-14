import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


function Signup(props) {

    const [formState, setFormState] = useState({ email: '', password: '' });

    const [addUser] = useMutation(ADD_USER);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    return (
        <div className='container my-1'>
            <Link to='/login'>← Go to Login</Link>


            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex-row space-between my-2'>
                    <label htmlFor="firstName">First Name:</label>
                    <input placeholder='First' type="firstName" id='firstName' name="firstName" onChange={handleChange} />
                </div>
                <div className='flex-row space-between my-2'>
                    <label htmlFor="lastName">Last Name:</label>
                    <input placeholder='Last' type="lastName" id='lastName' name="lastName" onChange={handleChange} />
                </div>
                <div className='flex-row space-between my-2'>
                    <label htmlFor="email">Email:</label>
                    <input placeholder='Email' type="email" id='email' name='email' onChange={handleChange} />
                </div>
                <div className='flex-row space-between my-2'>
                    <label htmlFor="password">Password:</label>
                    <input placeholder='*******' type="password" name='password' id='pwd' onChange={handleChange} />
                </div>
                <div className='flex-row flex-end'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>

    );
}

export default Signup;