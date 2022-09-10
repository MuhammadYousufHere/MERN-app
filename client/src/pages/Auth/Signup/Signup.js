import React, { useState, useEffect } from 'react';
import { faEnvelope, faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Signup.scss';
import logo from '../../../assets/logo-sm-t.png';
import Input from '../../../components/Form/Input/Input';
import Submit from '../../../components/Form/Input/Submit';
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    const { name, email, password, confirmPassword } = formData;

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/dashboard');
        }
        dispatch(reset());
    }, [user, navigate, isSuccess, isError, isLoading, dispatch, message]);
    const handleChange = (e) => {
        setFormdata((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) toast.error('Passwords do not match');
        else if (!password || !confirmPassword || !name || !email)
            return toast.error('All fields must be filled!');
        else {
            const credentials = {
                name,
                email,
                password,
            };
            dispatch(register(credentials));

            setFormdata({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        }
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
                        <h1>Sign Up</h1>
                        <p>Create your account now</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type='text'
                            placeholder='Name...'
                            name='name'
                            icon={faUser}
                            error='Please enter your name'
                            value={name}
                            color='transparent'
                            onChange={handleChange}
                        />
                        <Input
                            type='email'
                            placeholder='Enter your email...'
                            name='email'
                            icon={faEnvelope}
                            error='Please enter your name'
                            value={email}
                            onChange={handleChange}
                            color='transparent'
                        />
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Create Password...'
                            name='password'
                            icon={faEye}
                            error='Please enter your name'
                            value={password}
                            onChange={handleChange}
                            onShow={() => setShowPassword(!showPassword)}
                            color='transparent'
                        />
                        <Input
                            type={showConfPassword ? 'text' : 'password'}
                            placeholder='Confirm your password...'
                            name='confirmPassword'
                            icon={faEye}
                            error='Please enter your name'
                            value={confirmPassword}
                            onChange={handleChange}
                            color='transparent'
                            onShow={() =>
                                setShowConfPassword(!showConfPassword)
                            }
                        />
                        <Submit value='Signup' />
                        <div className='already-confirm'>
                            <p>
                                Already have an account?
                                <Link to='/signin'> sign in</Link>
                            </p>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Signup;
