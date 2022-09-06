import React from 'react';
import avatar from '../../assets/avatar/name1.png';
import './Comment.scss';
const Comment = () => {
    return (
        <div className='comment-container'>
            <div className='comment-body'>
                <div className='author-info'>
                    <div className='left'>
                        <div className='avatar'>
                            <img src={avatar} alt='' />
                        </div>
                        <div className='info'>
                            <h5>Asim Khan</h5>
                            <p>@asimkahnhere</p>
                        </div>
                    </div>
                    <div className='right timestamp'></div>
                </div>
                <div className='post-text'>
                    <p>
                        Lorem ipsum Lorem abd ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum 🔥
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Comment;
