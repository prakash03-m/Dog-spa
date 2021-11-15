import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthContext from '../store/auth-context';

import { Link as LinkScroll } from 'react-scroll';

import './Wrapper.css';

const Wrapper = (props) => {

    const onProfileScreen = props.onProfileScreen;
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
        props.history.replace('/');
    }

    return (
        <div>
            <header className="header" id='header'>
                <Link to='/'>
                    <div className='logo'>Dog Spa</div>
                </Link>
                <nav>
                    <ul>
                        {!isLoggedIn && (
                            <li>
                                <LinkScroll to='contact' smooth={true} duration={1000}>Contact us</LinkScroll>
                            </li>
                        )}
                        {isLoggedIn && !props.onProfileScreen && (
                            <li>
                                <Link to='/profile'>Profile</Link>
                            </li>
                        )}
                        {isLoggedIn && props.onProfileScreen && (
                            <li>
                                <Link to='/service'>Service</Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li>
                                {/* <button onClick={logoutHandler}>Logout</button> */}
                                <Link to='/' onClick={logoutHandler}>Logout</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default withRouter(Wrapper);