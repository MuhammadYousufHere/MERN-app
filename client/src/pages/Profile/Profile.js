import React, { useEffect } from 'react';
import './Profile.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../../features/profileSlice';
import { Link } from 'react-router-dom';
const Profile = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile);
    const auth = useSelector((state) => state.auth);
    // console.log(profile);
    console.log(auth.user.token);

    useEffect(() => {
        getCurrentUser(auth.user.token);
    }, [auth.user.token]);
    return (
        <div className='profile-container'>
            Profiless
            <div className='profile-body'>
                <Link to='/posts'>Posts</Link>
            </div>
        </div>
    );
};

export default Profile;
