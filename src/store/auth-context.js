import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    email: '',
    isLoggedin: false,
    login: (token, email) => { },
    logout: () => { }
})

export const AuthContextProvider = props => {
    const initialToken = localStorage.getItem('token');
    const initialEmail = localStorage.getItem('email');
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState(initialEmail);

    const userIsLoggedIn = !!token;

    const loginHandler = (token, email) => {
        setToken(token);
        setEmail(email);
        console.log(token);
        console.log('here', email);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        // setTimeout(logoutHandler, 30000);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    };

    const contextValue = {
        token: token,
        email: email,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;