import React from 'react';
import './ActionBar.scss';
const ActionBar = () => {
    return (
        <div className='actionbar-container'>
            <div className='actionbar-body'>
                <div className='like'>
                    <p>Like ❤️</p>
                </div>
                <div className='comment'>
                    <p>Comment</p>
                </div>
                {/* <div className="like"></div> */}
            </div>
        </div>
    );
};

export default ActionBar;
