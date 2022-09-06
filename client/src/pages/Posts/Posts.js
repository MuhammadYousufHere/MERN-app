import React, { useEffect } from 'react';
import './Posts.scss';

import { useDispatch } from 'react-redux';
import { getUserPost } from '../../features/postSlice';
import ActionBar from './ActionBar';
import Comment from './Comment';

import CommentForm from './CommentForm';
import PostItem from './PostItem';
import TextEmojis from './TextEmojis';
const Posts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserPost());
    }, [dispatch]);
    return (
        <>
            <div className='post-container'>
                <div className='post-body'>
                    <div className='content'>
                        <PostItem />
                        <ActionBar />
                        <Comment />

                        <CommentForm />
                    </div>
                </div>
            </div>

            <TextEmojis />
        </>
    );
};

export default Posts;
