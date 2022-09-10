import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Moment from 'react-moment'
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../../features/profileSlice';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar-girl.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostItem from '../Posts/PostItem';
import {
  faBriefcase,
  faBuilding,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import CreatePost from '../Posts/CreatePost';
import PostInput from '../Posts/PostInput';
import { Modal } from '../../components/Modal/Modal';

const socialsIcons = [
  { id: 1, icon: faLinkedin, title: 'linkedIn', link: 'saraalikhan' },
  { id: 2, icon: faFacebook, title: 'Faceebook', link: 'sarali123' },
  { id: 3, icon: faTwitter, title: 'Twitter', link: 'sarakhan221' },
  { id: 4, icon: faInstagram, title: 'Instagram', link: 'sarahere123' },
  { id: 5, icon: faYoutube, title: 'Youtube', link: '12sarakhan' },
];
const Profile = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  //

  const [barHeight, setBarHeight] = useState(100);
  const [userSkills, setUserSkills] = useState([]);
  const [userExperience, setUserExperience] = useState([]);
  const [userEducation, setUserEducation] = useState([]);
  const [userName, setUserName] = useState('Sara Ali Khan');
  const [userWebsite, setUserWebsite] = useState('www.ibex.com');
  const [userAddr, setUserAddr] = useState('Karachi,Pk');
  const [userBio, setUserBio] = useState(
    'I am MERN Stack developer and Maths Teacher based in Karachi,PK.'
  );

  const [show, setShow] = useState(false);

  const [userCompany, setUserCompany] = useState('Ibex');
  const [userStatus, setUserStatus] = useState('MERN Stack Developer');
  const { profile, exists, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  useLayoutEffect(() => {
    if (ref.current && ref.current.clientHeight) {
      const height = ref.current.clientHeight;
      setBarHeight(height);
    }
  }, [loading]);
  console.log(profile)

  const closeModalHandler = () => setShow(false);
  useEffect(() => {
    if (exists && !loading) {
      const {
        user: { name },
        website,
        location,
        status,
        company,
        skills,
        bio,
        experience,
        education
      } = profile;

      setUserName(name);
      setUserCompany(company);
      setUserWebsite(website);
      setUserAddr(location);
      setUserStatus(status);
      setUserBio(bio);
      setUserSkills(skills);
      setUserExperience(experience)
      setUserEducation(education)
    }
  }, [profile, exists, loading]);
  // const handleDeleteEdu = () => {
  //   // dispatch(deleteUserExperience(id))
  //   dispatch(deleteUserEducation(id))
  // }

  // loader
  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <Navbar />
      <div className='profile-container'>
        <div className='profile-body'>
          {exists ? (
            <>
              <div className='top-row'>
                <div className='profile-area'>
                  <div className='constant-info'>
                    <div className='avatar'>
                      <Link to='/profile'>
                        <img
                          src={avatar}
                          alt='avatar'
                        />
                        <div className='active'></div>
                      </Link>
                    </div>
                    <div className='text'>
                      <h2>Welcom,</h2>
                      <h3>{userName}</h3>
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
                  <div className='professional-info'>
                    <div className='bio'>
                      <p>{userBio || null} </p>
                    </div>
                    <div className='with-icon-info'>
                      <div className='address'>
                        <FontAwesomeIcon
                          icon={faBuilding}
                        />
                        <p>{userAddr}</p>
                      </div>
                      <div className='company'>
                        <FontAwesomeIcon
                          icon={faBriefcase}
                        />
                        <p>{userCompany}</p>
                      </div>
                      <div className='website'>
                        <FontAwesomeIcon
                          icon={faGlobe}
                        />
                        <a href={userWebsite}>
                          {userWebsite}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {userStatus && (
                  <div className='status'>
                    <p>{userStatus}</p>
                  </div>
                )}
              </div>
              <div>
                <Modal show={show}>
                  <PostInput
                    avatar={avatar}
                    name={userName}
                    onClose={closeModalHandler}
                  />
                </Modal>
              </div>

              <div className='experience-container'>
                <h2>Work Experience</h2>
                <div className='work-experience'>
                  <div
                    className='item-bar'
                    style={{ height: `${barHeight}px` }}>
                    {Array.from({ length: userExperience.length }).map(
                      (_, i) => {
                        return (
                          <div
                            key={i + 1}
                            className='circle'></div>
                        );
                      }
                    )}

                    <div className='circle-empty'></div>
                  </div>
                  <div className='experience-box' ref={ref}>
                    {userExperience.map((exp) => {
                      return (
                        <div className='item' key={exp._id}>
                          <h4>
                            <Moment format='YYYY/MM'>{exp.from}</Moment> -
                            <span
                              style={{
                                color: exp.to ? 'gray' : 'green',
                              }}>{' '}
                              {exp.to ? <Moment format='YYYY/MM'>{exp.to}</Moment> : ' Present'}
                            </span>
                          </h4>
                          <h3>{exp.title}</h3>

                          <h4>{exp.company},{exp.location}</h4>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>


              <div className='experience-container'>
                <h2>Education</h2>
                <div className='work-experience'>
                  <div
                    className='item-bar'
                    style={{ height: `${barHeight}px` }}>
                    {Array.from({ length: userEducation.length }).map(
                      (_, i) => {
                        return (
                          <div
                            key={i + 1}
                            className='circle'></div>
                        );
                      }
                    )}

                    <div className='circle-empty'></div>
                  </div>
                  <div className='experience-box' ref={ref}>
                    {userEducation.map(edu => {
                      return (
                        <div className='item' key={edu._id}>
                          <h4>
                            <Moment format='YYYY'>{edu.from}</Moment> -
                            <span style={{ color: edu.to ? 'grey' : 'green' }}>
                              {' '}{edu.to ? <Moment format='YYYY'>{edu.to}</Moment> : ' Present'}
                            </span>
                          </h4>

                          <h3>{edu.degree},{edu.fieldofstudy}</h3>
                          <h4>
                            {edu.school}, {edu.location}
                          </h4>
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>

              <h2>Social</h2>
              <div className='social-links'>
                {socialsIcons.map((item) => {
                  return (
                    <div className='link' key={item.id}>
                      <div className='icon'>
                        <FontAwesomeIcon
                          icon={item.icon}
                          color=''
                        />
                      </div>
                      <p>{item.link}</p>
                    </div>
                  );
                })}
              </div>
              <div className='skills-container'>
                <h2>Skills</h2>
                <div className='skills'>
                  {userSkills.map((skill, i) => {
                    return (
                      <div key={i} className='skill'>
                        <p>{skill}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <CreatePost
                // avatar={avatar}
                avatar={profile.user.avatar}
                onClick={() => setShow(true)}
              />

              <PostItem
                name={userName}
                userName={userName.toLowerCase().split(' ')}
                // userAvatar={avatar}
                userAvatar={profile.user.avatar}
                postText='Which Programming language do you love the most?'
              />

            </>
          ) : (
            <h2>Please setup your profile!</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
