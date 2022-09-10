import axios from 'axios';
import authHeader from './util';

const API_URL = 'http://localhost:8080/api/profile';


const getAllProfiles = async () => {
  try {
    const res = await axios.get(API_URL, { headers: authHeader() });
    console.log(res.data)

  } catch (error) {
    const msg = error.response.data;
    const msgStatus = error.response.status;

    return { msg, msgStatus };
  }
};
// 
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
const deleteUserProfile = async () => {
  try {
    const res = await axios.delete(API_URL, { headers: authHeader() });
    return res.data;
  } catch (error) {
    const msg = error.response.data;
    const msgStatus = error.response.status;

    return { msg, msgStatus };
  }
};

// 
const getUserProfileById = async (userID) => {
  try {

    const res = await axios.get(API_URL + `/user/${userID}`);
    console.log(res.data)

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

const addUserExperiance = async (userData) => {
  try {
    axios.put(API_URL + '/experience', userData, { headers: authHeader(), 'Content-Type': 'application/json' });

  } catch (error) {
    const msg = error.response.statusText;
    const msgStatus = error.response.status;

    return { msg, msgStatus };
  }
}
const deleteUserExperiance = async (expId) => {
  try {
    axios.delete(API_URL + `/experience/${expId}`, { headers: authHeader() });

  } catch (error) {
    const msg = error.response.statusText;
    const msgStatus = error.response.status;

    return { msg, msgStatus };
  }
}
const addUserEducation = async (userData) => {
  try {
    axios.put(API_URL + '/education', userData, { headers: authHeader(), 'Content-Type': 'application/json' });

  } catch (error) {
    const msg = error.response.statusText;
    const msgStatus = error.response.status;

    return { msg, msgStatus };
  }
}
const deleteUserEducation = async (eduID) => {
  try {
    axios.delete(API_URL + `/education/${eduID}`, { headers: authHeader() });

  } catch (error) {
    const msg = error.response.statusText;
    const msgStatus = error.response.status;

    return { msg, msgStatus };
  }
}

const profileService = {
  getCurrentProfile,
  deleteUserProfile,
  getAllProfiles,
  getUserProfileById,
  createProfile,
  addUserExperiance,
  deleteUserExperiance,
  addUserEducation,
  deleteUserEducation,
};
export default profileService;
