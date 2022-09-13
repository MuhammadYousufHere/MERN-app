import { useSelector } from 'react-redux'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import '../../App.scss';
import './Sidebar.scss';
import { SidebarData, SidebarPR } from './SidebarData';

const Sidebar = ({ onClose, left = 0 }) => {

  const { user } = useSelector((state) => state.auth)

  const color = '#6c7983';

  return (
    <div className='sidebar' style={{ left: `${-left}%` }}>
      <div className='close' onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} color={color} />
      </div>
      <ul className='sidebar__list'>
        {user ? (SidebarPR.map((data, key) => {
          return (
            <li
              key={key}
              className={
                window.location.pathname === data.link
                  ? 'sidebar__item active'
                  : 'sidebar__item'
              }

            >
              <Link to={data.link} >
                <div className='sidebar__wrapper-img'>
                  <img
                    className='sidebar__img'
                    src={data.icon}
                    alt='img'
                  />
                </div>

                <div className='sidebar__title'>{data.title}</div>
              </Link>
            </li>
          );
        })) : (
          SidebarData.map((data, key) => {
            return (
              <li
                key={key}
                className={
                  window.location.pathname === data.link
                    ? 'sidebar__item active'
                    : 'sidebar__item'
                }
              >
                <Link to={data.link} >
                  <div className='sidebar__wrapper-img'>
                    <img
                      className='sidebar__img'
                      src={data.icon}
                      alt='img'
                    />
                  </div>

                  <div className='sidebar__title'>{data.title}</div>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
