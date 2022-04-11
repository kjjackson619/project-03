import React, { useState } from 'react';
import { useMutation } from '@apollo/client'

import Auth from '../../utils/auth';

const Login = (props) => {

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);


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
            const { data } = await login({
                variables: { ...formstate },
            });

            Auth.login(data.login.token);
        }
        catch (err) {
            console.error(err);
        }

        setFormState({
            email: '',
            password: ''
        });
    };

    return (
        <section id="#account-page">
            <div>
                <h2>Login</h2>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" defaultValue={email} onBlur={handleChange} name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="text" defaultValue={password} onBlur={handleChange} name="password" />
                    </div>
                    {errorMessage && (
                        <div>
                            <p className="error-text">
                                {errorMessage}
                            </p>
                        </div>
                    )}

                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>

    )
}

export default Login
