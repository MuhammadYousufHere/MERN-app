import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Emojis.scss';

const TextEmojis = () => {
    const emojis = {
        blessed: '😇',
        laugh: '😂',
        cry: '😭',
        sleep: '😴',
        shit: '💩',
        thoughtful: '🤔',
        shocked: '😮',
        party: '🥳',
        lovely: '😍',
        exhausted: '😥',
        tooShocked: '😱',
        speechLess: '🤐 ',
        yoo: '🤟',
        strong: '💪',
        clap: '👏',
        wave: '👋',
        loli: '🤙',
        dislike: '👎',
        like: '👍',
        fire: '🔥',
    };
    const handleClick = (e) => {
        console.log(e.target.innerHTML);
    };
    return (
        <div className='emojis-container'>
            <div className='left-btn'>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className='emojis-body'>
                {Object.values(emojis).map((item, i) => {
                    return (
                        <div
                            className='emoji'
                            key={i}
                            onClick={(e) => handleClick(e)}>
                            <p>{item}</p>
                        </div>
                    );
                })}
            </div>
            <div className='right-btn'>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    );
};

export default TextEmojis;
