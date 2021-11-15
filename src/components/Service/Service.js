import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import ServiceScreen from '../../UI/ServiceScreen';

import Wrapper from '../../UI/Wrapper';

const Service = props => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    console.log(isLoggedIn);

    return (
        <div>
            <Wrapper />
            {isLoggedIn && <ServiceScreen />}
            {!isLoggedIn && <p>User must logged in</p>}
        </div>
    )
}

export default Service;