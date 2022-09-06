import React from 'react';
import './Specification.scss';
import { data, path } from './Data';
const Specification = () => {
    return (
        <div className='specification-container'>
            <div className='spec-body'>
                {data.map(({ id, title, icon, bg, boxBG }) => {
                    return (
                        <div
                            className='box'
                            key={id}
                            style={{ background: `${boxBG}` }}>
                            <img src={icon} alt={title} />
                            <div className='title'>
                                <h3>{title}</h3>
                                <div className='border'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='163'
                                        height='14'
                                        viewBox='0 0 163 14'
                                        fill='none'
                                        className='injected-svg'>
                                        <path
                                            fillRule='evenodd'
                                            clipRule='evenodd'
                                            d={path}
                                            // fill='#00C795'
                                            fill={bg}></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Specification;
