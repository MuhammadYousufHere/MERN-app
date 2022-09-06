import React from 'react';
import './Postitem.scss';
import avatar from '../../assets/avatar/name4.png';

const PostItem = () => {
    return (
        <div className='post-item-container'>
            <div className='p-item-body'>
                <div className='author-info'>
                    <div className='left'>
                        <div className='avatar'>
                            <img src={avatar} alt='avatar' />
                        </div>
                        <div className='info'>
                            <h4>Fiza Khan</h4>
                            <p>@asimkahnhere</p>
                        </div>
                    </div>
                    <div className='right timestamp'>
                        <p>16h</p>
                    </div>
                </div>
                <div className='post-text'>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Eveniet exercitationem perferendis neque ipsam
                        cupiditate reprehenderit ut laborum quam nisi enim
                        officiis vitae.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
