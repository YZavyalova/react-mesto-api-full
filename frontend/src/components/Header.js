import React from "react";
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg'

function Header({ url, link, email, onLogOut}) {

    return(
        <header className="header page__header">
            <Link to='/'>
                <img src={logo} alt='логотип' className="header__logo"/>
            </Link>
            <div className="header__wrapper">
                <p>{email}</p>
                <Link className="header__link" to={url} onClick={onLogOut}>{link}</Link>
            </div>
        </header>
    );
}


export default Header;