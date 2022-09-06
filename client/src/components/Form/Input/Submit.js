import React from 'react';
import Input from './Input';
import './Submit.scss';
const Submit = ({ otherProps, value }) => {
    return (
        <Input
            type='submit'
            className='submit-btn'
            inputStyle='submit-btn-style'
            {...otherProps}
            value={value}
        />
    );
};

export default Submit;
