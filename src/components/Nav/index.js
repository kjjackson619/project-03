import React from 'react';


function Nav() {

    return (
        <header>
            <h1>
                <a href="/">
                    <span></span>
                    Ecommerce
                </a>
            </h1>
            <nav>
                <ul className="flex-row">
                    <li className="mx-2">
                        <a href="#account">
                            <p>
                                Account
                            </p>
                        </a>
                    </li>
                    <li className="mx-1">

                        <a href="#cart">
                            <p>
                                🛒 View Cart
                            </p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Nav;