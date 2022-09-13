import React, { useState } from 'react';
import './CommentSection.scss';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PostItem from '../Posts/PostItem';
import { useDispatch } from 'react-redux';
import { CommentForm, Comment } from '../Posts/index';
import { deletePost, likePost } from '../../features/postSlice';

const CommentSection = () => {
    const activeUser = JSON.parse(localStorage.getItem('token'));

    const location = useLocation();
    const dispatch = useDispatch();
    //
    const { comments, date, name, avatar, likes, text, _id } = location.state;
    console.log(location.state);
    const [renderComments, setRenderComments] = useState([]);

    const handleEdit = () => {};
    const handleDelete = (postId) => {
        dispatch(deletePost(postId));
    };

    const handleLike = (postId) => {
        dispatch(likePost(postId));
        // dispatch(unlikePost(postId))
    };

    useState(() => {
        setRenderComments(comments);
    }, []);
    return (
        <>
            <Navbar />
            <div className='comment-on-post-container'>
                <div className='comment-on-post-body'>
                    <PostItem
                        userAvatar={avatar}
                        name={name}
                        time={date}
                        userName={name.toLowerCase().split(' ')}
                        postText={text}
                        likes={likes.length}
                        comments={comments.length}
                        onLike={handleLike}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    {renderComments.map((comment) => (
                        <Comment
                            key={comment._id}
                            time={comment.date}
                            avatar={comment.avatar}
                            text={comment.text}
                            name={comment.name}
                        />
                    ))}
                </div>
            </div>
            <div className='comment-fixed-input'>
                <CommentForm postID={_id} avatar={activeUser.avatar} />
            </div>
        </>
    );
};

export default CommentSection;
