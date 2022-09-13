import { faEllipsis, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Comment.scss';
import TimeAgo from './TimeAgo';
const Comment = ({ name, avatar, text, time, onDelete, onEdit }) => {
    const [showOpt, setShowOpt] = useState(false);
    return (
        <div className='comment-container'>
            <div className='comment-body'>
                <div className='author-info'>
                    <div className='left'>
                        <div className='avatar'>
                            <img src={avatar} alt='user' />
                        </div>
                        <div className='info'>
                            <h5>{name}</h5>
                            <p>@{name.toLowerCase().split(' ')}</p>

                            <div className='timeago'>
                                <TimeAgo timestamp={time} />
                            </div>
                        </div>
                    </div>
                    <div className='right timestamp'>
                        <div className='right options-bar'>
                            <FontAwesomeIcon
                                icon={faEllipsis}
                                onClick={() => setShowOpt(!showOpt)}
                            />
                            <div
                                className='options'
                                style={{
                                    display: `${showOpt ? 'flex' : 'none'}`,
                                }}>
                                <div className='item' onClick={onDelete}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                    <p>Delete post</p>
                                </div>
                                <div className='item' onClick={onEdit}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faPen} />
                                    </div>
                                    <p>Edit post</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='post-text'>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default Comment;
