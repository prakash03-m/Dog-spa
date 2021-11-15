import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import AuthContext from '../../store/auth-context';
import ProfileScreen from '../../UI/ProfileScreen';
import Wrapper from '../../UI/Wrapper';

const Profile = props => {

    const [profileData, setProfileData] = useState({ email: '', ownerName: '', dogName: '', dob: '', gender: '', phoneNumber: '', address: '' })

    const [onProfile, setOnProfile] = useState(false);
    const authCtx = useContext(AuthContext);
    const loginEmail = authCtx.email;
    const isLoggedIn = authCtx.isLoggedIn;
    // console.log(loginEmail, isLoggedIn);

    let userData = [];
    // let profileData;

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
            // })
        }).then(data => {
            console.log(data);
            userData = Object.entries(data);
            console.log(userData);
            loadDataHandler();
        }).catch(err => {
            alert(err.message)
        })
    }
    const loadDataHandler = () => {
        console.log(userData, loginEmail);
        for (const [key, { email, ownerName, dogName, dob, gender, phoneNumber, address }] of userData) {
            console.log(key, email);
            if (loginEmail === email) {
                setProfileData({
                    email: email,
                    ownerName: ownerName,
                    dogName: dogName,
                    dob: dob,
                    gender: gender,
                    phoneNumber: phoneNumber,
                    address: address
                })
                setOnProfile(true)
                // authCtx.profileScreenHandler(onProfile);
                console.log(profileData);
                break;
            }
        }
    }
    return (
        <div>
            <Wrapper onProfileScreen={onProfile} />
            {isLoggedIn && <ProfileScreen profileScreenData={profileData} />}
            {!isLoggedIn && <p>User must logged in</p>}
        </div>
    )
}

export default withRouter(Profile);