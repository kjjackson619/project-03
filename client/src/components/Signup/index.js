import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


const Signup = () => {

    const [formState, setFormState] = useState({ name: '', email: '', password: '' });

    const [addUser, { error }] = useMutation(ADD_USER);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState }
            });
            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section>
            <div>
                <h2>Sign Up</h2>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" defaultValue={name} name="name" onBlur={handleChange} ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" defaultValue={email} onBlur={handleChange} name="email-address" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="text" defaultValue={password} onBlur={handleChange} name="password-create" />
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
        </section >
    )
}

export default Signup;