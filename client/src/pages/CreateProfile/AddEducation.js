import React, { useState, useEffect } from 'react'
import './AddEducation.scss'
import { toast } from 'react-toastify'
import Input from '../../components/Form/Input/Input'
import TextArea from '../../components/Form/Input/TextArea'
import Submit from '../../components/Form/Input/Submit'
import { faSchool, faLocation, faMapLocationDot, faLocationDot, faGraduationCap, faCalendar } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUserEducation } from '../../features/profileSlice'
const AddEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    location: '',
    fieldofstudy: '',
    school: '',
    degree: '',
    current: true,
    description: '',

  });

  const {
    from,
    to,
    location,
    fieldofstudy,
    school,
    degree,
    current,
    description
  } = formData;
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!school && !fieldofstudy && !from) {
      toast.error('School, fieldofstudy & from are reqired field.');
    } else {
      dispatch(addUserEducation(formData));
      console.log(formData)
      toast.success('Education added successfully!');
      navigate('/dashboard')
      setFormData({
        from: '',
        to: '',
        location: '',
        fieldofstudy: '',
        school: '',
        degree: '',
        current: '',
        description: '',
      });
    }
  };
  const handleCheck = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.checked }
    })
  }
  return (
    <>
      <Navbar />
      <div className='add-education-container'>
        <div className="add-education-body">
          <form onSubmit={handleSubmit}>
            <Input
              type='text'
              placeholder='School...'
              name='school'
              icon={faSchool}
              tip='School or Unversity where you studied or studying'
              value={school}
              color='grey'
              onChange={handleChange}
            />
            <Input
              type='text'
              placeholder='Field of study...'
              name='fieldofstudy'
              icon={faGraduationCap}
              tip='Your major field of study'
              value={fieldofstudy}
              color='grey'
              onChange={handleChange}
            />
            <Input
              type='text'
              placeholder='Degree..'
              name='degree'
              icon={faGraduationCap}
              tip='Your degree'
              value={degree}
              color='grey'
              onChange={handleChange}
            />
            <Input
              type='text'
              placeholder='Location...'
              name='location'
              icon={faLocationDot}
              tip='Location of school or college where you studied or studying'
              value={location}
              color='grey'
              onChange={handleChange}
            />
            <Input
              type='date'
              placeholder='From...'
              name='from'
              // icon={faCalendar}
              tip='Joing date '
              value={from}
              color='grey'
              onChange={handleChange}
            />

            <div className="checkbox">
              <label htmlFor='current' id='current'>Currently Studying ?</label>
              <input
                id='current'
                type='checkbox'
                name='current'
                checked={current}
                value={current}

                onChange={handleCheck}
              />
            </div>
            {
              !current && (
                <Input
                  type='date'
                  placeholder='From...'
                  name='to'
                  // icon={faCalendar}
                  tip='Completion of degree date '
                  value={to}
                  color='grey'
                  onChange={handleChange}
                />
              )
            }
            <TextArea
              value={description}
              placeholder='Anything you want to add...'
              name='description'
              onChange={handleChange}
            />
            <Submit />

          </form>
        </div>
      </div>
    </>
  )
}

export default AddEducation