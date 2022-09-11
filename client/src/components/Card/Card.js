import React from 'react'
import './Card.scss'
const Card = ({ children }) => {
  return (
    <section className='card-container'>
      <div className="card-body">{children}</div>
    </section>
  )
}

export default Card