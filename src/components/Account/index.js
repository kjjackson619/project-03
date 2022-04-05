import React, { useState } from 'react';


function Account() {

    const [formState, setFormState] = useState({ name: '', email: '', password: '' });

    const { name, email, password } = formState;

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    console.log(formState);

    return (
        <section>
            <div>
                <h2>Login</h2>
                <form id="login-form">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" defaultValue={email} onChange={handleChange} name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="text" defaultValue={password} onChange={handleChange} name="password" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <br />
            <div>
                <h2>Sign Up</h2>
                <form id="signup-form">
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" defaultValue={name} name="name" onChange={handleChange} ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" defaultValue={email} onChange={handleChange} name="email-address" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="text" defaultValue={password} onChange={handleChange} name="password-create" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    )
}

export default Account;