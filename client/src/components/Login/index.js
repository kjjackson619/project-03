import React, { useState } from 'react';
import { validateEmail } from '../../utils/helpers';


function Login() {

    const [formState, setFormState] = useState({ email: '', password: '' });

    const { email, password } = formState;

    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(e) {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            console.log(isValid);

            if (!isValid) {
                setErrorMessage('Email invalid, please enter valid email address.');
            } else {
                setErrorMessage('');
            }
        } else {
            if (!e.target.value.length) {
                setErrorMessage(`${e.target.name} is required.`);
            } else {
                setErrorMessage('');
            }
        }

        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value })
        };

        console.log('errorMessage', errorMessage);
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formState);
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
