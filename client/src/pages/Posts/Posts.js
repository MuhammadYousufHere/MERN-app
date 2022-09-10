import React, { useEffect, useState } from 'react';
import './Posts.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getUserPost } from '../../features/postSlice';
import ActionBar from './ActionBar';
import Comment from './Comment';

import CommentForm from './CommentForm';
import PostItem from './PostItem';
import TextEmojis from './TextEmojis';
import Navbar from '../../components/Navbar/Navbar';
import CreatePost from './CreatePost';
const Posts = () => {
  const { posts, loading, error } = useSelector((state) => state.post)
  const userData = JSON.parse(localStorage.getItem('token'))

  const [allPosts, setAllPosts] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserPost());
  }, [dispatch]);
  useEffect(() => {
    if (posts) {
      setAllPosts(posts)
    }

  }, [posts])
  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <>
      <Navbar />
      <div className='post-container'>
        <div className='post-body'>
          <div className='content'>
            <CreatePost avatar={userData.avatar} />
            {allPosts.map((post, i) => <PostItem postText={post.text} name={post.name} userAvatar={post.avatar} userName={post.name.toLowerCase().split(' ')} key={i} likes={post.likes.length} comments={post.comments.length} />
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
