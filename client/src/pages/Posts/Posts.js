import React, { useEffect, useState } from 'react';
import './Posts.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getAllUserPost, likePost, unlikePost } from '../../features/postSlice';
import { util } from '../../util/util';
import { Modal } from '../../components/Modal/Modal';
import PostInput from './PostInput';
import PostItem from './PostItem';
import Navbar from '../../components/Navbar/Navbar';
import CreatePost from './CreatePost';
const Posts = () => {
  const { posts, loading, error, post, success } = useSelector((state) => state.post)
  const userData = JSON.parse(localStorage.getItem('token'))
  // 
  const [allPosts, setAllPosts] = useState([])
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // 
  useEffect(() => {
    dispatch(getAllUserPost());
  }, [dispatch, post, success]);
  useEffect(() => {
    if (posts) {
      setAllPosts(posts)


    }

  }, [posts, loading, success])
  const handleEdit = () => { }
  const handleDelete = (postId) => {
    dispatch(deletePost(postId))
  }
  const handleComment = (post) => {
    navigate('/comment-section', { state: post })
  }
  const handleLike = (postId) => {
    dispatch(likePost(postId))
    // dispatch(unlikePost(postId))
  }
  const handleAutoClose = () => {
    util.handleAutoClose(setShow)
  }

  // 


  useEffect(() => {
    setIsLoading(false)
  }, [])
  const closeModalHandler = () => setShow(false);
  // 
  // loader
  if (isLoading) {
    return <h2>Loadingx...</h2>
  }
  return (
    <>
      <Navbar />
      <div className='post-container'>
        <div className='post-body'>
          <div className='content'>

            <CreatePost avatar={userData.avatar} onClick={() => setShow(true)} />

            {loading ? <h3>Loading...</h3> : (
              allPosts.map((post) => <PostItem
                postText={post.text}
                name={post.name}
                time={post.date}
                userAvatar={post.avatar}
                userName={post.name.toLowerCase().split(' ')}
                key={post._id}
                likes={post.likes.length}
                comments={post.comments.length}
                onComment={() => handleComment(post)}
                onLike={() => handleLike(post._id)}
                onEdit={() => handleEdit(post._id)}
                onDelete={() => handleDelete(post._id)}
              />
              )
            )}

          </div>
          <div>
            <Modal show={show}>
              <PostInput
                avatar={userData.avatar}
                name={userData.name}
                onClose={closeModalHandler}
                autoClose={handleAutoClose}

              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
