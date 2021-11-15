import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router';
import AckModal from './AckModal';

import './ProfileScreen.css';

const ProfileScreen = props => {

    const history = useHistory();

    const [buttonName, setButtonName] = useState('Edit');
    const [email, setEmail] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [dogName, setDogName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const [save, setSave] = useState(false);

    useEffect(() => {
        console.log('here');
        setEmail(props.profileScreenData.email);
        setOwnerName(props.profileScreenData.ownerName);
        setDogName(props.profileScreenData.dogName);
        setDob(props.profileScreenData.dob);
        setGender(props.profileScreenData.gender);
        setPhoneNumber(props.profileScreenData.phoneNumber);
        setAddress(props.profileScreenData.address);
    }, [props.profileScreenData])

    const onClickHandler = () => {
        if (buttonName === 'Edit') {
            setButtonName('Save');
            document.getElementById('name').removeAttribute("disabled");
            document.getElementById('dog\'s name').removeAttribute("disabled");
            document.getElementById('dog\'s dob').removeAttribute("disabled");
            document.getElementById('gender').removeAttribute("disabled");
            document.getElementById('phoneNumber').removeAttribute("disabled");
            document.getElementById('address').removeAttribute("disabled");
            return;
        } else {
            setSave(true);
        }
    }
    const onChangeHandler = (event) => {
        setOwnerName(event.target.value);
    }

    const onDogNameChangeHandler = event => {
        setDogName(event.target.value);
    }

    const onPhoneNumberChangeHandler = event => {
        setPhoneNumber(event.target.value);
    }

    const onAddressChangeHandler = event => {
        setAddress(event.target.value);
    }

    const successHandler = () => {
        setSave(false);
        history.push('/service');
    }

    return (
        <Fragment>
            <div className='container-fluid'>
                {save && <AckModal title='Message' message='Update request sent to the server. Profile will be updated once the data is verified' onConfirm={successHandler} />}
                < div className="profileScreen" >
                    {/* <div className="row"> */}
                    < form >
                        <label htmlFor='email'>Email </label>
                        <input type='text' id='email' value={email} disabled ></input>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='ownerName' value={ownerName} onChange={onChangeHandler} disabled></input>
                        <label htmlFor="dog's name">Dog Name</label>
                        <input type='text' id="dog's name" value={dogName} disabled onChange={onDogNameChangeHandler}></input>
                        <label htmlFor="dog's dob">Dog DOB</label>
                        <input type='text' id="dog's dob" value={dob} disabled></input>
                        <label htmlFor='gender'>Gender</label>
                        <input type='text' id='gender' value={gender} disabled></input>
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input type='text' id='phoneNumber' value={phoneNumber} disabled onChange={onPhoneNumberChangeHandler}></input>
                        <label htmlFor='address'>Address</label>
                        <textarea type='textarea' id='address' value={address} disabled onChange={onAddressChangeHandler}></textarea>
                    </form >
                    <button type='button' id='edit' onClick={onClickHandler} data-toggle="modal" data-target="#myModal">{buttonName}</button>
                    <button type='button' id='cancel'>Cancel</button>
                </div >
            </div >
        </Fragment >
    )

}

export default withRouter(ProfileScreen);