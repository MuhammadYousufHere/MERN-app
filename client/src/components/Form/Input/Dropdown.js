import React from 'react';
import {
    faChevronDown,
    faExclamationCircle,
    faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Dropdown.scss';
const Dropdown = ({
    color,
    data = {},
    tip,
    error,
    defaultTitle = 'Select',
    name,
    onChange,
}) => {
    return (
        <>
            <div className='dropdown-container'>
                <div className='dropdown-body'>
                    <select name={name} onChange={onChange}>
                        <option value=''>{defaultTitle}</option>
                        {data.map(({ id, value }) => {
                            return (
                                <option key={id} value={value}>
                                    {value}
                                </option>
                            );
                        })}
                    </select>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className='icon'
                        // onClick={onShow}
                    />
                </div>
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

export default Dropdown;
