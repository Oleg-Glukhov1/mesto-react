import React from 'react';
import logo from '../images/logo.svg';
const Header = (props) => {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Места России" />
        </header>
    )
}

export default Header;