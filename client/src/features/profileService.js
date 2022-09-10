import axios from 'axios';
import authHeader from './util';

const API_URL = 'http://localhost:8080/api/profile';

const getCurrentProfile = async () => {
    try {
        const res = await axios.get(API_URL + '/me', { headers: authHeader() });
        return res.data;
    } catch (error) {
        const msg = error.response.data;
        const msgStatus = error.response.status;

        return { msg, msgStatus };
    }
};

const createProfile = async (userData) => {
    try {
        const res = axios.post(API_URL, userData, { headers: authHeader() });
        return res.data;
    } catch (error) {
        const msg = error.response.statusText;
        const msgStatus = error.response.status;

        return { msg, msgStatus };
    }
};

const profileService = {
    getCurrentProfile,
    createProfile,
};
export default profileService;
