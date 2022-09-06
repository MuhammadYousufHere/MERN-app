import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-body'>
                <div className='bottom'>
                    <p>
                        Developed and Designed by{' '}
                        <a
                            href='https://www.linkedin.com/in/muhammadyousuf-here'
                            className='my'>
                            MY
                        </a>
                    </p>
                    <p>
                        Copyrights &copy;<Link to='/'> Connecto</Link> 2021 -
                        2022
                    </p>
                    <p>All rights reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
