import React from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.scss';
const LinkButton = ({ to, title }) => {
    return (
        <Link className='link-button' to={to}>
            {title}
        </Link>
    );
};

export default LinkButton;
