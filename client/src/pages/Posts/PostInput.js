import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faTimes } from '@fortawesome/free-solid-svg-icons';
import TextArea from '../../components/Form/Input/TextArea';
import React, { useState } from 'react';
import './PostInput.scss';
import Submit from '../../components/Form/Input/Submit';
const PostInput = ({ avatar, name, onClose }) => {
    const [postText, setPostText] = useState({ post: '' });
    const handleChange = (e) => {
        setPostText((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };
    const { post } = postText;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postText);
        setPostText({
            post: '',
        });
    };

    return (
        <div className='post-input-container'>
            <div className='post-input-body'>
                <div className='top'>
                    <h4>Create Post</h4>
                    <div className='close' onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <div className='middle'>
                    <div className='upper'>
                        <div className='avatar'>
                            <img src={avatar} alt='user' />
                        </div>
                        <div className='info'>
                            <h4>{name}</h4>
                            <p>
                                Public
                                <FontAwesomeIcon icon={faGlobe} />
                            </p>
                        </div>
                    </div>
                    <div className='lower'>
                        <form onSubmit={handleSubmit}>
                            <div className='input-container'>
                                <TextArea
                                    value={post}
                                    name='post'
                                    placeholder="What's on your mind?"
                                    onChange={handleChange}
                                    width='100%'
                                />
                            </div>
                            <div className='actions'>
                                <Submit value='Post Now' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostInput;
