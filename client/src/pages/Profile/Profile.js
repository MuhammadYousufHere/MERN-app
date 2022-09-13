import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Moment from 'react-moment'
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, getUserGithubRepos } from '../../features/profileSlice';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../assets/avatar-girl.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostItem from '../Posts/PostItem';
import { util } from '../../util/util';
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
import { deletePost, getAllUserPost, likePost } from '../../features/postSlice';


const Profile = () => {
  const dispatch = useDispatch();
  const refEdu = useRef();
  const refExp = useRef();
  //
  const [userAvatar, setUserAvatar] = useState('')
  const [userID, setUserID] = useState('')
  const [barHeightEdu, setBarHeightEdu] = useState(65);
  const [barHeightExp, setBarHeightExp] = useState(65);
  const [userSkills, setUserSkills] = useState([]);
  const [userSocial, setUserSocial] = useState({});
  const [userExperience, setUserExperience] = useState([]);
  const [userEducation, setUserEducation] = useState([]);
  const [userName, setUserName] = useState('');
  const [userWebsite, setUserWebsite] = useState('');
  const [userAddr, setUserAddr] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userPosts, setUserPosts] = useState([])
  const [show, setShow] = useState(false);
  const [userCompany, setUserCompany] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [compLoading, setCompLoading] = useState(true)

  // 

  const { profile, exists, loading, success } = useSelector((state) => state.profile);
  const { posts } = useSelector((state) => state.post);
  // get user info
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getAllUserPost())
    dispatch(getUserGithubRepos('muhammadyousufhere'))
  }, [dispatch]);
  // 
  useLayoutEffect(() => {
    if (refEdu.current && refEdu.current.clientHeight) {
      const height = refEdu.current.clientHeight;
      setBarHeightEdu(height);
    }

  }, [loading, profile]);
  // 
  useLayoutEffect(() => {
    if (refExp.current && refExp.current.clientHeight) {
      const height = refExp.current.clientHeight;
      setBarHeightExp(height);
    }

  }, [loading, profile]);

  const closeModalHandler = () => setShow(false);
  useEffect(() => {
    if (exists && !loading) {
      const {
        user: { name, avatar, _id },
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
      setUserID(_id)
    }

  }, [profile, exists, loading]);

  useEffect(() => {
    if (posts) {
      const userOnly = posts.filter(({ user }) => user === userID).map((post) => post)
      setUserPosts(userOnly)
    }
  }, [posts, profile, userID, success])

  const navigate = useNavigate()
  const handleEdit = () => { }
  const handleDelete = (postId) => {
    dispatch(deletePost(postId))
  }
  const handleComment = (post) => {
    navigate('/comment-section', { state: post })
  }
  const handleLike = (postId) => {
    dispatch(likePost(postId))
    // dispatch(unlikePost(postId))
  }

  const handleAutoClose = () => {
    util.handleAutoClose(setShow)
  }
  useEffect(() => {
    setCompLoading(false)
  }, [])
  // loader
  if (compLoading && loading) {
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
                    autoClose={handleAutoClose}
                  />
                </Modal>
              </div>

              {userExperience.length > 0 && (
                <div className='experience-container'>
                  <h2>Work Experience</h2>
                  <div className='work-experience'>
                    <div
                      className='item-bar'
                      style={{ height: `${barHeightExp}px` }}>
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
                    <div className='experience-box' ref={refExp}>
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
                      style={{ height: `${barHeightEdu}px` }}>
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
                    <div className='experience-box' ref={refEdu}>
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

                avatar={profile.user.avatar}
                onClick={() => setShow(true)}
              />

              {
                loading ? <h3>Loading ...</h3> : (
                  userPosts.map((post) => <PostItem
                    postText={post.text}
                    name={post.name}
                    userAvatar={post.avatar}
                    userName={post.name.toLowerCase().split(' ')}
                    key={post._id}
                    time={post.date}
                    likes={post.likes.length}
                    comments={post.comments.length}
                    onComment={() => handleComment(post)}
                    onLike={() => handleLike(post._id)}
                    onEdit={() => handleEdit(post._id)}
                    onDelete={() => handleDelete(post._id)}
                  />)
                )
              }

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
