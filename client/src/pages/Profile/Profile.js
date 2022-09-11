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
import Social from './Social';


const Profile = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  //
  const [userAvatar, setUserAvatar] = useState('')
  const [barHeight, setBarHeight] = useState(100);
  const [userSkills, setUserSkills] = useState([]);
  const [userSocial, setUserSocial] = useState({});
  const [userExperience, setUserExperience] = useState([]);
  const [userEducation, setUserEducation] = useState([]);
  const [userName, setUserName] = useState('');
  const [userWebsite, setUserWebsite] = useState('');
  const [userAddr, setUserAddr] = useState('');
  const [userBio, setUserBio] = useState('');
  const [show, setShow] = useState(false);
  const [userCompany, setUserCompany] = useState('');
  const [userStatus, setUserStatus] = useState('');

  // 

  const { profile, exists, loading } = useSelector((state) => state.profile);

  // get user info
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // 
  useLayoutEffect(() => {
    if (ref.current && ref.current.clientHeight) {
      const height = ref.current.clientHeight;
      setBarHeight(height);
    }
  }, [loading]);

  const closeModalHandler = () => setShow(false);
  useEffect(() => {
    if (exists && !loading) {
      const {
        user: { name, avatar },
        website,
        location,
        status,
        company,
        skills,
        bio,
        experience,
        education,
        social
      } = profile;
      setUserAvatar(avatar)
      setUserName(name);
      setUserCompany(company);
      setUserWebsite(website);
      setUserAddr(location);
      setUserStatus(status);
      setUserBio(bio);
      setUserSkills(skills);
      setUserExperience(experience)
      setUserEducation(education)
      setUserSocial(social)
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
                          src={userAvatar}
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

              {userExperience.length > 0 && (
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
              )}


              {userEducation.length > 0 && (
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
              )}

              {(userSocial !== null) && (
                <div className='user-social'>
                  <h2>Social</h2>
                  {userSocial.facebook && <Social icon={faFacebook} to={Object.values(userSocial.facebook)} />}
                  {userSocial.linkedin && <Social icon={faLinkedin} to={Object.values(userSocial.linkedin)} />}
                  {userSocial.twitter && <Social icon={faTwitter} to={Object.values(userSocial.twitter)} />}
                  {userSocial.instagram && <Social icon={faInstagram} to={Object.values(userSocial.instagram)} />}
                  {userSocial.youtube && <Social icon={faYoutube} to={Object.values(userSocial.youtube)} />}

                </div>
              )}

              {userSkills.length > 0 && (
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
              )}
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
