import React from 'react'
import Button from '../../components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './DevItem.scss'
import { faLocationDot, } from '@fortawesome/free-solid-svg-icons'
const DevItem = ({ name = 'Sara Shah', location = 'London, UK' }) => {
  return (
    <div className='dev-item'>
      <div className="info-box">
        <div className="avatar">
          <img src={require('../../assets/avatar-girl.png')} alt="" />
        </div>
        <div className="intro">
          <h4>{name}</h4>
          <div className="status">
            <div className="icon">
              <FontAwesomeIcon icon={faLocationDot} color='gray' />

            </div>
            <p>
              {location}
            </p>
          </div>

        </div>

      </div>
      <div className="connect-btn">
        <Button title='Connect' active />
      </div>
    </div>
  )
}

export default DevItem