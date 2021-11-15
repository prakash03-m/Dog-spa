import React, { useEffect, useState } from 'react';
// import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import AckModal from '../../UI/AckModal';
import Loader from '../../UI/Loader';
import $ from "jquery";

import RegistrationScreen from '../../UI/RegistrationScreen';
import Wrapper from '../../UI/Wrapper';

const Registration = props => {
    // const [username, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [modalDisplay, setModalDisplay] = useState(false);

    // const userNameHandler = (props) => {
    //     console.log(props);
    //     setUserName()
    // }

    const newDogRegistrationHander = newUser => {
        setIsLoading(true);
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJ6eJBI_d_8rngVP0zc4kQtrgeJXXsUQY', {
            method: 'POST',
            body: JSON.stringify({
                email: newUser.email,
                password: newUser.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.ok) {
                newUserProfileDataHandler(newUser);
                setSuccess(true);
                return res.json()
            } else {
                return res.json().then(data => {
                    console.log(data);
                    setIsLoading(false);
                    let errorMessage = 'Authentication failed';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then(data => { console.log(data); }).catch(err => {
            alert(err.message)
        })
    }
    const newUserProfileDataHandler = newUser => {
        // User data::
        const user = {
            email: newUser.email,
            ownerName: newUser.ownerName,
            dogName: newUser.dogName,
            dob: newUser.dob,
            gender: newUser.gender,
            phoneNumber: newUser.phoneNumber,
            address: newUser.address
        }
        fetch('https://dogspa-58be2-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setIsLoading(false);
            if (res.ok) {
                // setError({
                //     title: 'Invalid Age',
                //     message: 'Please enter a valid age > 0'
                // });
                return res.json()
            } else {
                return res.json().then(data => {
                    console.log(data);
                    setIsLoading(false);
                    let errorMessage = 'Authentication failed';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then(data => {
            console.log(data);
        }).catch(err => {
            alert(err.message)
        })
    }

    useEffect(() => {
        if (!isLoading && success) {
            setModalDisplay(true);
            // $('#myModal').modal('show');
        }
    }, [isLoading, success]);

    const showModal = () => {
        setModalDisplay(true);
    }

    console.log(modalDisplay);

    // console.log('here', success, isLoading);
    // async function userProfile(newUser) {
    //     const user = {
    //         email: newUser.email,
    //         ownerName: newUser.ownerName,
    //         dogName: newUser.dogName,
    //         dob: newUser.dob,
    //         phoneNumber: newUser.phoneNumber,
    //         address: newUser.address
    //     }
    //     console.log(user);
    //     const response = await fetch('https://dogspa-58be2-default-rtdb.firebaseio.com/users.json', {
    //         method: 'POST',
    //         body: JSON.stringify(user),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const data = await response.json();
    //     console.log(data);
    // }

    return (
        <React.Fragment>
            <Wrapper />
            {isLoading && <Loader />}
            <RegistrationScreen
                // userNameDataHandler={userNameHandler}
                onRegistration={newDogRegistrationHander} modal={modalDisplay} />

            <button data-toggle="modal" data-target="#myModal" onClick={showModal}>For modal</button>
        </React.Fragment>
    )

}

export default withRouter(Registration);