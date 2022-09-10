import './Actions.scss';
import man from '../../assets/avatar/name1.png';
import man2 from '../../assets/avatar/name3.png';
import man3 from '../../assets/avatar/name2.png';
import girl from '../../assets/avatar-girl.png';
import { faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const Actions = () => {
    const [like, setLike] = useState(false);
    const handleComment = () => {
        console.log('comment');
    };
    return (
        <div className='actions-container'>
            <div className='action-body'>
                <div className='actions'>
                    <div className='likes'>
                        <FontAwesomeIcon
                            icon={faHeart}
                            onClick={() => setLike(!like)}
                            color={like ? '#cc0000' : ''}
                        />
                        <p>43</p>
                    </div>
                    <div className='comments'>
                        <FontAwesomeIcon
                            icon={faCommentDots}
                            onClick={handleComment}
                        />
                        <p>22</p>
                    </div>
                </div>
                <div className='peoples'>
                    <img className='img' src={man} alt='user' />
                    <img className='img' src={man2} alt='user' />
                    <img className='img' src={girl} alt='user' />
                    <div className='img users-stack'>
                        <span>+3</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Actions;
