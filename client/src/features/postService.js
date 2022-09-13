import axios from 'axios';
import authHeader from './util';
const API_URL = 'http://localhost:8080/api/posts';

const getAllPosts = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: authHeader(),
    });
    return res.data;
  } catch (error) {
    const msg = error.response.data;
    const msgStatus = error.response.status;

    return { msg, msgStatus };
  }
};

const createAPost = async (postText) => {
  try {
    const res = await axios.post(API_URL, postText, { headers: authHeader(), 'Content-Type': 'application/json' })
    return res.data
  } catch (error) {
    const msg = error.response.statusText;
    const msgStatus = error.response.status;

    return { msg, msgStatus };

  }
}
const deleteAPost = async (postID) => {
  await axios.delete(API_URL + `/${postID}`, { headers: authHeader() })
}

const likePost = async (postID) => {
  try {
    const res = await axios.put(API_URL + `/like/${postID}`, {}, { headers: authHeader(), 'Content-Type': 'application/json' })

    return res.data
  } catch (error) {
    const msg = error.response.data;
    const status = error.response.status
    console.log(msg)
    return { msg, status }
  }
}
// 
const unlikePost = async (postID) => {
  try {
    const res = await axios.put(API_URL + `/unlike/${postID}`, {}, { headers: authHeader(), 'Content-Type': 'application/json' })

    return res.data
  } catch (error) {
    const msg = error.response.data;
    const status = error.response.status
    console.log(msg)
    return { msg, status }
  }
}

const commentOnPost = async (state) => {
  try {
    const res = await axios.post(API_URL + `/comment/${state.id}`, state.comment, { headers: authHeader(), 'Content-Type': 'application/json' })

    return res.data
  } catch (error) {
    const msg = error.response.data;
    const status = error.response.status
    console.log(msg)
    return { msg, status }
  }

}
const postService = {
  getAllPosts,
  createAPost,
  deleteAPost,
  likePost,
  unlikePost,
  commentOnPost
};

export default postService;
