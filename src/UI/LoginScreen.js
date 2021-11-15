import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './LoginScreen.css';
import image from '../assests/Doggy.gif';
import ContactUs from './ContactUs';

const HomePage = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputType, setInputType] = useState('password');
    const [userErrorMessage, setUserErrorMessage] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);

    const [selectMark1, setSelectMark1] = useState('\u2716')
    const [selectMark2, setSelectMark2] = useState('\u2716')
    const [selectMark3, setSelectMark3] = useState('\u2716')

    const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const smallCheckValidator = /[a-z]+/g;
    const capsCheckValidator = /[A-Z]+/g;
    const numCheckValidator = /[\d]+/g;

    const emailChangeHandler = event => {
        setEmail(event.target.value);
    }

    const passwordHandler = event => {
        setPassword(event.target.value);
    }

    const registrationHandler = () => {
        props.history.push('/registration')
    }

    const loginHandler = (e) => {
        e.preventDefault()
        console.log("p", password)
        if (email.includes('@')) {
            setUserErrorMessage(false);
            if (password.match(passwordValidator)) {
                const user = {
                    email: email,
                    password: password
                }
                props.onLogin(user);
                setPasswordErrorMessage(false);
                setSelectMark1('\u2714');
                setSelectMark2('\u2714');
                setSelectMark3('\u2714');
            }
            else {
                password.length >= 6 ? setPasswordErrorMessage(false) : setPasswordErrorMessage(true)
                smallCheckValidator.test(password) ? setSelectMark1('\u2714') : setSelectMark1('\u2716')
                capsCheckValidator.test(password) ? setSelectMark2('\u2714') : setSelectMark2('\u2716')
                numCheckValidator.test(password) ? setSelectMark3('\u2714') : setSelectMark3('\u2716')
            }
        }
        else {
            setUserErrorMessage(true);

        };
    }

    const showPasswordHandler = (event) => {
        inputType === 'password' ? setInputType('text') : setInputType('password')
    }

    const emailInputClasses = userErrorMessage ? 'inputClass invalid' : 'inputClass';
    const passwordInputClasses = passwordErrorMessage ? 'inputClass invalid' : 'inputClass';

    return (
        <Fragment>
            <div className='loginScreen container'>
                <div className="row">
                    <section className="col-md-6">
                        <form onSubmit={loginHandler}>
                            <div className={emailInputClasses}>
                                <label htmlFor='email'>Email </label>
                                <input type='text' id='email' placeholder='Enter Email' onChange={emailChangeHandler}></input>
                            </div>
                            <div className={passwordInputClasses}>
                                <label htmlFor='pwd'>Password </label>
                                <input type={inputType} id='pwd' placeholder='Enter Password' onChange={passwordHandler}></input>
                            </div>
                            <span className="checkbox" ><input type="checkbox" onClick={showPasswordHandler} />Show password</span>
                            {userErrorMessage && <p id='errorMessage'>Enter Correct Email</p>}
                            {passwordErrorMessage && <p id='errorMessage'>Password must have atleast 6 digits</p>}
                            <div>
                                <button type='submit' id='login' onClick={loginHandler}>Login</button>
                                <button type='button' id='register' onClick={registrationHandler}>Register</button>
                            </div>
                        </form>
                        <div>
                            <p>{selectMark1} Small letter check</p>
                            <p>{selectMark2} Capital letter check</p>
                            <p>{selectMark3} Number check</p>
                        </div>
                    </section>
                    <section className="col-md-6">
                        <img id='loginImg' src={image} />
                    </section>
                </div>
            </div>
            <ContactUs />
        </Fragment>
    )
}

export default withRouter(HomePage);