import React, { useState, useEffect } from 'react';
import './CreatePost.scss';
import Input from '../../components/Form/Input/Input';
import Submit from '../../components/Form/Input/Submit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTextWidth } from '@fortawesome/free-solid-svg-icons';
const CreatePost = ({ avatar, onClick }) => {
  return (
    <div className='create-post-container'>
      <div className='create-post-body'>
        <h2>Posts</h2>
        <div className='input-field' onClick={onClick}>
          <div className='comment-input'>
            <div className='avatar'>
              <img src={avatar} alt='user' />
            </div>
            <div className='input-like'>
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
