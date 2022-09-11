import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Social = ({ icon, title, to }) => {
  return (
    <div className='link' >
      <div className='icon'>
        <FontAwesomeIcon
          icon={icon}
          color='#212529'
        />
      </div>
      <a href='www.google.com'>
        {to}
      </a>
    </div>
  )
}

export default Social