import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getUserPost } from '../../features/postSlice';
const Posts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserPost());
    }, [dispatch]);
    return <div>Posts</div>;
};

export default Posts;
