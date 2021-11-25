import React from 'react'
import { useDispatch } from 'react-redux';
import {logout} from '../../features/userSlice';
import {useSelector} from "react-redux";
import { selectUser } from '../../features/userSlice';

function Landing() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    console.log(user);
    const handleLogout = (e) => {
    e.preventDefault();
    dispatch( logout());
}
    return (
        <div>
          <div className="container">
            <div className="imageContainer">
                <p>{user.name}</p>  
                <p>{user.email}</p>
                <p>+91 8964654561</p>
            </div>
            <button onClick={(e) => handleLogout(e)}> Logout</button>
          </div>
        </div>
    )
 
}

export default Landing;