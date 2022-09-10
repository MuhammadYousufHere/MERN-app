import React, { useState, useEffect } from 'react';
import { faEye, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import './SignIn.scss';
import logo from '../../../assets/logo-sm-t.png';
import Input from '../../../components/Form/Input/Input';
import Submit from '../../../components/Form/Input/Submit';
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    email: '',
    password: '',
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate('/dashboard');
      // navigate('/profile');
    }
    dispatch(reset());
  }, [user, navigate, isSuccess, isError, isLoading, dispatch, message]);

  const { email, password } = formData;
  const handleChange = (e) => {
    setFormdata((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !email)
      return toast.error('Fields should not be left empty!');
    else {
      const credentials = {
        email,
        password,
      };
      dispatch(login(credentials));
    }
    setFormdata({
      email: '',
      password: '',
    });
  };
  // will change later
  if (isLoading) {
    return <h4>loading...</h4>;
  }
  return (
    <div className='signup-container'>
      <div className='signup-body'>
        <div className='logo'>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <section className='form-area'>
          <div className='text'>
            <h1>Sign In</h1>
            <p>Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              type='email'
              placeholder='Email...'
              name='email'
              icon={faEnvelope}
              // error='Email'
              error='.'
              value={email}
              id='email'
              color='transparent'
              onChange={handleChange}
            />

            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password...'
              name='password'
              icon={faEye}
              // error='Please enter your name'
              error='.'
              value={password}
              id='password'
              onChange={handleChange}
              onShow={() => setShowPassword(!showPassword)}
              color='transparent'
            />
            <Submit value='Signin' />

            <div className='already-confirm'>
              <p>
                Don't have an account?
                <Link to='/signup'> sign up</Link>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
