import React, { useState } from 'react';
import './Postitem.scss';
import avatar from '../../assets/avatar/name4.png';
import Actions from './Actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faGlobe,
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

const PostItem = ({
    name = 'Fiza Khan',
    userName = 'username',
    userAvatar,
    postText = 'Lorem ipsum, dolor sit amet.',
    time,
}) => {
    const [showOpt, setShowOpt] = useState(false);
    return (
        <div className='post-item-container'>
            <div className='p-item-body'>
                <div className='author-info'>
                    <div className='left'>
                        <div className='avatar'>
                            <img src={userAvatar || avatar} alt='avatar' />
                        </div>
                        <div className='info'>
                            <h4>{name}</h4>
                            <p>@{userName}</p>
                            <p>
                                2 min ago
                                <FontAwesomeIcon icon={faGlobe} />
                            </p>
                        </div>
                    </div>
                    <div className='right options-bar'>
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            onClick={() => setShowOpt(!showOpt)}
                        />
                        <div
                            className='options'
                            style={{ display: `${showOpt ? 'flex' : 'none'}` }}>
                            <div className='item'>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                                <p>Delete post</p>
                            </div>
                            <div className='item'>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={faPen} />
                                </div>
                                <p>Edit post</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='post-text'>
                    <p>{postText}</p>
                </div>
                <Actions />
            </div>
        </div>
    );
};

export default PostItem;
