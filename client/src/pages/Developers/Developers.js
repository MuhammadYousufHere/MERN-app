import React, { useState, useEffect } from 'react'
import './Developers.js'

import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers, getUserByID } from '../../features/profileSlice.js'
const Developers = () => {
  const user = "6315a2eec9dee51f2bad28c1"
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers())
    // dispatch()

  }, [dispatch])

  return (
    <div>Developers</div>
  )
}

export default Developers