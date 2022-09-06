// == Base:
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../../App.scss';
import './Sidebar.scss';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
const Sidebar = ({ onClose, left = 0 }) => {
    const color = '#6c7983';
    return (
        <div className='sidebar' style={{ left: `${-left}%` }}>
            <div className='close' onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} color={color} />
            </div>
            <ul className='sidebar__list'>
                {SidebarData.map((data, key) => {
                    return (
                        <li
                            key={key}
                            className={
                                window.location.pathname === data.link
                                    ? 'sidebar__item active'
                                    : 'sidebar__item'
                            }
                            onClick={() =>
                                (window.location.pathname = data.link)
                            }>
                            <Link to={data.link} />
                            <div className='sidebar__wrapper-img'>
                                <img
                                    className='sidebar__img'
                                    src={data.icon}
                                    alt='img'
                                />
                            </div>

                            <div className='sidebar__title'>{data.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
