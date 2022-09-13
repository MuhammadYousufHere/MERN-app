import React, { useState, useEffect } from 'react';

import './CommentForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faImage, faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Input from '../../components/Form/Input/Input';
import { useDispatch } from 'react-redux';
import { commentOnPost } from '../../features/postSlice';

const CommentForm = ({ avatar, postID }) => {
  const dispatch = useDispatch()

  const [typeComment, setTypeComment] = useState({
    text: '',
  });
  const { text } = typeComment;
  const handleChange = (e) => {
    setTypeComment((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      return null
    } else {
      dispatch(commentOnPost({
        id: postID,
        comment: typeComment
      }))
      setTypeComment({
        text: ''
      })
    }

  }
  return (
    <div className='comment-form-container'>
      <div className='comment-form-body'>

        <form onSubmit={handleSubmit}>

          <Input
            name='text'
            value={text}
            placeholder='Type your comment...'
            onChange={handleChange} />
          <div className="actions">
            <div className="left">
              <button type="file">
                <FontAwesomeIcon icon={faImage} size='2x' />
              </button>
              <button >
                <FontAwesomeIcon icon={faSmile} size='2x' />
              </button>
            </div>
            <div className="right">
              <button type="submit">
                <FontAwesomeIcon icon={faPaperPlane} size='2x' />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
