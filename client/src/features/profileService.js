import axios from 'axios';

const API_URL = 'http://localhost:8080/api/profile/me';
const config = {
    header: 'x-auth-token',
};
const getCurrentProfile = async (user) => {
    try {
        const res = await axios.get(API_URL, config);
        console.log(res);
        return res.data;
    } catch (error) {
        const msg = error.response.statusText;
        const msgStatus = error.response.status;

        return { msg, msgStatus };
    }
};

const profileService = {
    getCurrentProfile,
};
export default profileService;
