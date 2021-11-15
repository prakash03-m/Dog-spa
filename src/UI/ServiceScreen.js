import React, { useContext, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../store/auth-context';

import './ServiceScreen.css';


const ServiceScreen = props => {

    // const dogNameInputRef = useRef();
    // const dogName = dogNameInputRef.current.value;

    let userData = [];

    const [dogName, setDogName] = useState('');

    const authCtx = useContext(AuthContext);
    const loginEmail = authCtx.email;
    console.log(loginEmail);

    useEffect(() => {
        fetchProfileDataHandler();
    }, [])

    const fetchProfileDataHandler = props => {
        fetch('https://dogspa-58be2-default-rtdb.firebaseio.com/users.json').then((res) => {
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
            userData = Object.values(data);
            loadDataHandler();
        }).catch(err => {
            alert(err.message)
        })
    }
    const loadDataHandler = () => {
        for (const { email, dogName } of userData) {
            if (loginEmail === email) {
                setDogName(dogName)
            }
        }
    }

    const onCancelHandler = () => {
        console.log('here');
    }
    return (
        <div className="service">
            <div>
                <h1>Choose from a variety of services we offer</h1>
            </div>
            <div>
                <label htmlFor="Dog's name">Dog's name </label>
                <input type='text' id="Dog's name" value={dogName}></input>
                <label htmlFor='Service'>Service </label>
                <select name="Service" type='text' id='Service' placeholder='Enter Service' >
                    <option value="Body Wash">Body Wash ₹500</option>
                    <option value="Hair grooming">Hair grooming ₹300</option>
                    <option value="Flea Removal">Flea Removal ₹250</option>
                </select>
                <button id='book'>Proceed to book</button>
                <button id='cancel' onClick={onCancelHandler}>Cancel</button>
            </div>
        </div>
    )
}
export default withRouter(ServiceScreen);