import React, { useState, useEffect } from 'react';

import './CommentForm.scss';
import TextArea from '../../components/Form/Input/TextArea';
import avatar from '../../assets/avatar/name3.png';

const CommentForm = () => {
    const [typeComment, setTypeComment] = useState({
        comment: '',
    });
    const { comment } = typeComment;
    const handleChange = (e) => {
        setTypeComment((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };
    return (
        <div className='comment-form-container'>
            <div className='comment-form-body'>
                <div className='avatar'>
                    <img src={avatar} alt='avatar' />
                </div>
                <form>
                    <TextArea
                        name='comment'
                        value={comment}
                        placeholder='Type your comment...'
                        onChange={handleChange}
                    />
                </form>
            </div>
        </div>
    );
};

export default CommentForm;
