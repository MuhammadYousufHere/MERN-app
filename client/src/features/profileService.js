import axios from 'axios';
import authHeader from './util';

const API_URL = 'http://localhost:8080/api/profile/me';

const getCurrentProfile = async () => {
    try {
        const res = await axios.get(API_URL, { headers: authHeader() });
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
