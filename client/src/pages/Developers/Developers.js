import React, { useState, useEffect } from 'react'
import './Developers.scss'
import Button from '../../components/Button/Button'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/Navbar/Navbar'
import Input from '../../components/Form/Input/Input'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers, getCurrentUser } from '../../features/profileSlice.js'
import Card from '../../components/Card/Card.js'
import DevItem from './DevItem'
const Developers = () => {
  const { profiles, profile, loading, success, exists } = useSelector((state) => state.profile)
  const isLogged = localStorage.getItem('token')

  // states
  const [renderDev, setRenderDev] = useState([])
  const [compLoading, setCompLoading] = useState(true)
  const [searchDev, setSearchDev] = useState({
    developer: ''
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLogged) {
      dispatch(getCurrentUser())

    }
  }, [isLogged, dispatch])
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  useEffect(() => {
    setCompLoading(false)
  }, [loading, profiles])
  useEffect(() => {
    if (!loading && exists) {
      const currentUserID = profile.user._id

      const developers = profiles.filter((profile) => profile.user._id !== currentUserID).map((dev) => dev)
      setRenderDev(developers)
    } else if (!loading) {
      setRenderDev(profiles)

    }
  }, [exists, loading, profiles, profile])
  const handleChange = (e) => {
    setSearchDev((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  // 
  if (compLoading && loading) {
    return <h2>loading...</h2>
  }
  return (
    <>
      <Navbar />
      <div className="developers-container">
        <div className="developers-body">
          <Card>
            <div className="search-box">
              <Input placeholder='Search a developer...'
                icon={faSearch} value={searchDev.developer}
                onChange={handleChange}
                name='developer'
              />
              <div className="quick-actions">
                <Button title='All' active={true} />
                <Button title='Top Rated' />
                <Button title='Active' />
              </div>
            </div>
          </Card>
          <div className="developers-profiles">
            {success ? (renderDev.map(profile => <DevItem name={profile.user.name} avatar={profile.user.avatar} status={profile.status} key={profile._id} location={profile.location} />)) : <h4>Loading...</h4>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Developers