import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';
// export const setAuth = (token) => {
//     // token come from local storage
//     // doing b/c we need send it with every request instead choosing which req to send with
//     if (token) {
//         // header we wanna set : x-auth-token to dcrypt token
//         axios.defaults.headers.common['x-auth-token'] = token;
//     } else {
//         delete axios.defaults.headers.common['x-auth-token'];
//     }
// };
// Register
const config = {
  header: {
    'Content-Type': 'application/json',
  },
};
const register = async (userData) => {
  const response = await axios.post(API_URL + 'users', userData, config);

  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data));
    return response.data;

  }

}

// login
const login = async (userData) => {
  const response = await axios.post(API_URL + 'auth', userData);

  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }
  return response.data;

};

// Logout
const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
