import {
    faExclamationCircle,
    faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './Input.scss';
const Input = ({
    icon,
    type = 'text',
    placeholder,
    name,
    onChange,
    onShow,
    onFocus,
    value,
    id,
    error,
    tip,
    className,
    inputStyle,
    color,
}) => {
    return (
        <>
            <div className={`input-group ${inputStyle}`}>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className={className}
                    value={value}
                    id={id}
                    onChange={onChange}
                    onFocus={onFocus}
                />
                {icon && (
                    <FontAwesomeIcon
                        icon={icon}
                        className='icon'
                        onClick={onShow}
                    />
                )}
            </div>
            {(error || tip) && (
                <div className='error-sec'>
                    <FontAwesomeIcon
                        icon={error ? faExclamationCircle : faLightbulb}
                        className='error-icon'
                        color={color}
                    />
                    <p className='error' style={{ color }}>
                        {error ? error : tip}
                    </p>
                </div>
            )}
        </>
    );
};

export default Input;
