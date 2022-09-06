import axios from 'axios';
const API_URL = 'http://localhost:8080/api/posts';

const getPost = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        const msg = error.response.statusText;
        const msgStatus = error.response.status;

        return { msg, msgStatus };
    }
};

const postService = {
    getPost,
};

export default postService;
