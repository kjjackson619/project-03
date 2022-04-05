import React from 'react';


function Account() {

    return (
        <section>
            <div>
                <h1>Login or Sign Up</h1>
                <form id="login-form">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="text" name="password" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <br />
            <div>
                <form id="signup-form">
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name"></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email-address" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="text" name="password-create" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    )
}

export default Account;