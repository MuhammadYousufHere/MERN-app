import React from 'react';
import './Button.scss';
const Button = ({ title, active }) => {
  return <button className={`reg-button reg-${active ? 'active' : ''}`}>{title}</button>;
};

export default Button;
