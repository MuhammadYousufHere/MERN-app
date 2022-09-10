import { useCallback, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.scss';
import edu from '../../assets/edu.png';
import bag from '../../assets/bag.png';
import LinkButton from '../../components/Button/LinkButton';
import user1 from '../../assets/userman.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line
import { getCurrentUser } from '../../features/profileSlice';
import { reset, logout } from '../../features/authSlice';
import avatar from '../../assets/avatar-girl.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  // faStar,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import FooterLine from '../../components/FooterLine';

const Dashboard = () => {
  const dispatch = useDispatch();
  const naviagete = useNavigate();

  //
  //
  const { loading, exists } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const { name } = user;

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleExperience = () => {
    naviagete('/add-experience')
  };
  const handleEducation = () => {
    naviagete('/add-education')

  };
  const handleEdit = () => {
    console.log('clicked');
  };
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    naviagete('/');
  };
  // eslint-disable-next-line
  const handleRating = (id) => {
    console.log(id);
  };
  const data = [
    { id: 1, icon: user1, onClick: handleEdit },
    { id: 2, icon: edu, onClick: handleEducation },
    { id: 3, icon: bag, onClick: handleExperience },
  ];
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Navbar>
        {user && (
          <button className='btn' onClick={onLogout}>
            Log out
          </button>
        )}
      </Navbar>
      <div className='dashboard-container'>
        <div className='dashboard-body'>
          {/* <div className='heading'>
                        <h2>Dashboard</h2>
                    </div> */}
          <div className='top-row'>
            <div className='profile-area'>
              <div className='constant-info'>
                <div className='avatar'>
                  <Link to='/profile'>
                    <img src={avatar} alt='avatar' />
                    <div className='active'></div>
                  </Link>
                </div>
                <div className='text'>
                  <h2>Welcom,</h2>
                  <h3>{name}</h3>
                  <div className='rating'>
                    {Array.from({ length: 5 }).map(
                      (_, i) => (
                        <FontAwesomeIcon
                          icon={faStar}
                          key={i}
                          color='gold'
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              {/* <p>{profile.bio || null} </p> */}
            </div>

            {/* {userStatus && (
                            <div className='status'>
                                <p>{userStatus}</p>
                            </div>
                        )} */}
          </div>

          <div className='action-group'>
            {data.map((item) => {
              return (
                <div className='item' key={item.id}>
                  <img
                    src={item.icon}
                    alt={'exp' + item.id}
                  />
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    size='2x'
                    onClick={item.onClick}
                  />
                </div>
              );
            })}
          </div>

          {!exists ? (
            <div className='banner'>
              <div className='banner-body'>
                <div className='icon'>
                  <span></span>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                <h4>
                  Now that you have created your account let's
                  add some info about you so people can know
                  you better
                </h4>
                <button
                  className='btn'
                  onClick={() =>
                    naviagete('/create-profile')
                  }>
                  Let's Beggin
                </button>
              </div>
            </div>
          ) : (
            <div className='go-to' style={{ alignSelf: 'center' }}>
              <LinkButton to='/profile' title='Go to Profile' />
            </div>
          )}
        </div>
        <div className='footer'>
          <FooterLine />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
