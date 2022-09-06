import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.scss';
import avatar from '../../assets/avatar-girl.png';
import edu from '../../assets/edu.png';
import bag from '../../assets/bag.png';
import user1 from '../../assets/userman.png';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset, logout } from '../../features/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlusCircle,
    faStar,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const handleExperience = () => {
        console.log('clicked');
    };
    const handleEducation = () => {
        console.log('clicked');
    };
    const handleEdit = () => {
        console.log('clicked');
    };
    const naviagete = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        naviagete('/');
    };
    const handleRating = (id) => {
        console.log(id);
    };
    const data = [
        { id: 1, icon: user1, onClick: handleEdit },
        { id: 2, icon: edu, onClick: handleEducation },
        { id: 3, icon: bag, onClick: handleExperience },
    ];
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
                            <div className='avatar'>
                                <img src={avatar} alt='avatar' />
                                <div className='active'></div>
                            </div>
                            <div className='text'>
                                <h2>Welcom,</h2>
                                <h3>Sarah Smith</h3>
                                <div className='rating'>
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            key={i}
                                            color='gold'
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='status'>
                            <p>Frontend Developer</p>
                        </div>
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

                    <div className='banner'>
                        <div className='banner-body'>
                            <div className='icon'>
                                <span></span>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                            <h4>
                                Now that you have created your account let's add
                                some info about you so people can know you
                                better
                            </h4>
                            <button
                                className='btn'
                                onClick={() => naviagete('/create-profile')}>
                                Let's Beggin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
