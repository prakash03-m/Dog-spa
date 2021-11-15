import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import './RegistrationScreen.css';

import image from '../assests/Registration-Original.jpg'
import ContactUs from './ContactUs';
import AckModal from './AckModal';

const RegistrationScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [dogName, setDogName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState('');


    const emailHandler = (event) => {
        setEmail(event.target.value);
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }
    const ownerNameHandler = (event) => {
        setOwnerName(event.target.value);
    }
    const dogNameHandler = (event) => {
        setDogName(event.target.value);
    }
    const dateOfBirthHandler = (event) => {
        setDob(event.target.value);
    }
    const genderHandler = () => {
        setGender(document.getElementById("Gender").value);
    }
    const phoneNumberHandler = (event) => {
        setPhoneNumber(event.target.value);
    }
    const addressHandler = (event) => {
        setAddress(event.target.value);
    }

    useEffect(() => {
        setShowModal(props.modal)
        // console.log(props.modal);
    }, [props]);

    const registrationHandler = () => {
        const newUser = {
            email: email,
            password: password,
            ownerName: ownerName,
            dogName: dogName,
            dob: dob,
            gender: gender,
            phoneNumber: phoneNumber,
            address: address
        }
        props.onRegistration(newUser);

        setEmail('');
        setPassword('');
        setOwnerName('');
        setDogName('');
        setDob('');
        setGender('Select Gender');
        setPhoneNumber('');
        setAddress('');
    }

    const cancelHandler = () => {
        props.history.push('/')

    }


    const successHandler = () => {
        setSuccess(null);
    }

    return (
        <Fragment>
            <div className='registration container-fluid'>
                {showModal && <AckModal title='Message' message='User successfully registered' onConfirm={successHandler} onCloseModal={successHandler} />}
                <h1>User Registration</h1>
                <div className="row">
                    <section className="col-sm-6">
                        <div className='username'>
                            <label htmlFor='email'>Email </label>
                            <input type='text' id='email' placeholder='Enter email' onChange={emailHandler} value={email}></input>
                        </div>
                    </section>
                    <section className="col-sm-6">
                        <div className='password'>
                            <label htmlFor='Password'>Password </label>
                            <input type='password' id='Password' placeholder='Enter desired Password' onChange={passwordHandler} value={password} ></input>
                        </div>
                    </section>
                </div>
                <div className="row">
                    <section className="col-sm-6">
                        <label htmlFor="Dog owner's name">Dog owner's name</label>
                        <input type='text' id="Dog owner's name" placeholder="Dog owner's name" onChange={ownerNameHandler} value={ownerName}></input>
                        <label htmlFor="Dog's name">Dog's name </label>
                        <input type='text' id="Dog's name" placeholder="Dog's name" onChange={dogNameHandler} value={dogName}></input>
                        <label htmlFor="Dog's birth date">Dog's birth date</label>
                        <input type='date' id="Dog's birth date" onChange={dateOfBirthHandler} value={dob}></input>
                        <label htmlFor='Gender'>Gender </label>
                        <select name="Gender" type='text' id='Gender' onChange={genderHandler} value={gender}>
                            <option value="Select Gender" disabled selected>Select Gender</option>
                            <option value="Male-Puppy">Male-Puppy</option>
                            <option value="Male-Adult">Male-Adult</option>
                            <option value="Female-Puppy">Female-Puppy</option>
                            <option value="Female-Adult">Female-Adult</option>
                        </select>
                        <label htmlFor='Phone number'>Phone number </label>
                        <input type='tel' id='Phone number' placeholder='Enter Phone number' onChange={phoneNumberHandler} pattern="[0-9]{10}" maxLength="10" value={phoneNumber}></input>
                        <label htmlFor='Address'>Address </label>
                        <textarea rows='3' cols='15' id='Address' placeholder='Enter Address' onChange={addressHandler} value={address}></textarea>
                        <div>
                            <button data-toggle="modal" data-target="#myModal" type='button' id='ok' onClick={registrationHandler} >Ok</button>
                            <button id='cancel' onClick={cancelHandler}>Cancel
                            </button>
                        </div>
                        <br />
                    </section>
                    <section className="col-sm-6">
                        <img className='registrationImgClass' id='registration' src={image} />
                    </section>
                </div>
            </div>
            <ContactUs />
        </Fragment>
    )
}

export default withRouter(RegistrationScreen);