import React, { useState } from "react";

const Login = ({ handleLogin }) => {
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setState(old => ({
            ...old,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = state;
        if (!email || !password) {
            return;
        }
        handleLogin({ email, password });
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
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
                    minLength="6" 
                    maxLength="200" 
                    autoComplete="off"/>
                <span className="error" id="password-error"/>
                <button type="submit" className="auth__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;