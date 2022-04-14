import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                &copy;{new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;