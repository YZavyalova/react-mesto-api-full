import React, { useState } from "react";
import { Link } from 'react-router-dom'

const Register = ({ handleRegister }) => {

    const [state, setState] = useState({
        email: '',
        password: '',
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setState(old => ({
            ...old,
            [name]: value
        }))
    }
    const handleSubmit = e => {
        const { email, password } = state;
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        handleRegister({ email, password });
        
    };

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={state.email || ''}
                    onChange={handleChange} 
                    className="auth__input"
                    required 
                    placeholder="Email" 
                    autoComplete="off"/>
                <span className="error" id="email-error"/>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={state.password || ''}
                    onChange={handleChange} 
                    className="auth__input" 
                    required 
                    placeholder="Пароль" 
                    minLength="8" 
                    maxLength="200" 
                    autoComplete="off"/>
                <span className="error" id="password-error"/>
                <button type="submit" className="auth__button">Зарегистрироваться</button>
                <Link className="auth__link" to=''>
                    <p>Уже зарегистрированы? Войти</p>
                </Link>
            </form>
        </div>
    )
}

export default Register;