import React from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Signup from './pages/Auth/Signup/Signup';
import SignIn from './pages/Auth/Login/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Posts from './pages/Posts/Posts';
const App = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register-page' element={<Register />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile />} />

                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/create-profile' element={<CreateProfile />} />
                {/* Catch all - replace with 404 component if you want */}
                <Route path='*' element={<Navigate to='/404' replace />} />
                <Route path='/404' element={<NotFound />} />
            </Routes>

            <ToastContainer />
        </React.Fragment>
    );
};

export default App;
