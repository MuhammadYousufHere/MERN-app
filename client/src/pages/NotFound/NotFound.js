import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fourO4 from '../../assets/404.png';

import './NotFound.scss';
const NotFound = () => {
    const navigate = useNavigate();

    const [time, setTime] = useState(5);

    useEffect(() => {
        setTimeout(() => {
            if (time <= 5 && time !== 0) setTime(time - 1);
        }, 1000);
    }, [time]);

    setTimeout(() => {
        navigate('/');
    }, 5000);

    return (
        <div className='notFound-container'>
            <div className='notFound-body'>
                <h1>Oops! Page Not Found</h1>
                <img src={fourO4} alt='404' />
                <div className='back-auto-text'>
                    <p>The page you are looking for is beyond our reach</p>
                </div>
                <p>Let's get you...</p>

                <div className='home-redirecter'>
                    <p>Back Home in 00:00:0{time}</p>
                </div>
                <Link to='/'>Back Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
