import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, useHistory, withRouter } from 'react-router-dom';
import LoginScreen from '../../UI/LoginScreen';
import AuthContext from '../../store/auth-context';
import Wrapper from '../../UI/Wrapper';

const Login = (props) => {

    const history = useHistory();

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginHandler = props => {
        console.log(props);
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJ6eJBI_d_8rngVP0zc4kQtrgeJXXsUQY', {
            method: 'POST',
            body: JSON.stringify({
                email: props.email,
                password: props.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            setIsLoading(false);
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    console.log(data);
                    let errorMessage = 'Authentication failed';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then(data => {
            console.log(data);
            authCtx.login(data.idToken, data.email);
            history.push('/service');
        }).catch(err => {
            alert(err.message)
        })
    }

    return (
        <React.Fragment>
            <Wrapper loginCheck={isLoggedIn} />
            <div className="scroll-container">
                <LoginScreen onLogin={loginHandler} />
            </div >
        </React.Fragment>
    )
}

export default withRouter(Login);



    // const [usernameExist, setUsernameExist] = useState(null);
    // const [correctPassword, setCorrectPassword] = useState(null);
    // const [loginCredMatch, setLoginCredMatch] = useState(null);

    // const evaluateLoginCredentialsHandler = (props) => {
    //     const allUserDetails = props;
    //     for (var i = 0; i < allUserDetails.length; i++) {

    //         if (loginUsername === allUserDetails[i].username) {
    //             if (loginPassword === allUserDetails[i].password) {
    //                 console.log('threeA - Account exist');
    //                 setLoginCredMatch(true);
    //                 break;
    //             } else {
    //                 console.log('threeB - Incorrect password');
    //                 setCorrectPassword(false);
    //                 break;
    //             }
    //         } else {
    //             setUsernameExist(false);
    //             console.log('threeC - Username doesn\'t exist');
    //         }
    //     }
    // }
    // async function fetchAccountData() {
    //     // setLoading(true);
    //     // setError(null);
    //     // try {
    //     const response = await fetch('https://dogspa-58be2-default-rtdb.firebaseio.com/users.json');
    //     // if (!response.ok) {
    //     //     throw new Error('Something went wrong!');
    //     // }
    //     const data = await response.json();
    //     const accountData = [];
    //     for (const key in data) {
    //         accountData.push({
    //             id: key,
    //             username: data[key].username,
    //             password: data[key].password
    //         })
    //     }
    //     evaluateLoginCredentialsHandler(accountData);
    // }

        // if (loginCredMatch) {
    //     console.log('firstA');
    //     loginScreen = <LoginScreen onLogin={loginHandler} onUserLogin={loginSuccessMessage} />;
    // } else {
    //     console.log('firstB');
    //     if (!usernameExist) {
    //         loginScreen = <LoginScreen onLogin={loginHandler} onUserLogin={usernameFailureMessage} />;
    //     } else if (!correctPassword) {
    //         loginScreen = <LoginScreen onLogin={loginHandler} onUserLogin={passwordFailureMessage} />;
    //     }
    // }