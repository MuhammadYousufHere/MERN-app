import {
    faExclamationCircle,
    faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './Input.scss';
const Input = ({
    icon,
    type,
    placeholder,
    name,
    onChange,
    onShow,
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
