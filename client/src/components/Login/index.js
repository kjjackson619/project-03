import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

function Login(props) {

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const mutationResponse = await login({
                variables: { email: formstate.email, password: formState.password },
            });

            const token = mutationResponse.data.login.token;
            Auth.login(token);
        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <div className='container my-1'>
            <Link to='/signup'>← Go to Signup</Link>

            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex-row space-between my-2'>
                    <label htmlFor="email">Email:</label>
                    <input placeholder='Email' type="email" id='email' onChange={handleChange} name="email" />
                </div>
                <div className='flex-row space-between my-2'>
                    <label htmlFor="password">Password:</label>
                    <input placeholder='*******' type="password" id='pwd' onChange={handleChange} name="password" />
                </div>
                {error ? (
                    <div>
                        <p className="error-text">
                            Invalid credentials!
                        </p>
                    </div>
                ) : null}
                <div className='flex-row flex-end'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>


    );
}

export default Login;
