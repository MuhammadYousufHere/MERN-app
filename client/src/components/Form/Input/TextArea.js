import React from 'react';
import {
  faExclamationCircle,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TextArea.scss';
const TextArea = ({
  error,
  tip,
  placeholder,
  onChange,
  name,
  value,
  color,
  max = 100,
  width,
  focus = false,
  children,
}) => {
  return (
    <>
      <textarea
        onChange={onChange}
        placeholder={placeholder}
        className='textarea'
        name={name}
        value={value}
        maxLength={max}
        style={{ width }}
        autoFocus={focus}
      />
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
      {children}
    </>
  );
};

export default TextArea;
