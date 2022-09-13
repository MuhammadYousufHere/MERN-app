import './CreatePost.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const CreatePost = ({ avatar, onClick }) => {
  return (
    <div className='create-post-container'>
      <div className='create-post-body'>
        <h2>Posts</h2>
        <div className='input-field' >
          <div className='comment-input'>
            <Link to='/profile'>
              <div className='avatar'>
                <img src={avatar} alt='user' />
              </div>
            </Link>
            <div className='input-like' onClick={onClick}>
              <p>What's on your mind?</p>
              <FontAwesomeIcon icon={faTextWidth} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
