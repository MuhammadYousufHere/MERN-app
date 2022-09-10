import { useState } from 'react'
import './AddExperience.scss'
import { toast } from 'react-toastify'
import Input from '../../components/Form/Input/Input'
import TextArea from '../../components/Form/Input/TextArea'
import Submit from '../../components/Form/Input/Submit'
import { faLocationDot, faGraduationCap, faBuilding } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUserExperience } from '../../features/profileSlice'
const AddExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    location: '',
    company: '',
    title: '',

    current: true,
    description: '',

  });

  const {
    from,
    to,
    location,
    company,
    title,

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
    if (!title && !company && !from) {
      toast.error('Company, title & from are reqired field.');
    } else {
      dispatch(addUserExperience(formData));
      toast.success('Experience added successfully!');
      console.log(formData)
      setFormData({
        from: '',
        to: '',
        location: '',
        title: '',
        company: '',
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
      <div className='add-experience-container'>
        <div className="add-experience-body">
          <form onSubmit={handleSubmit}>
            <Input
              type='text'
              placeholder='Company Name...'
              name='company'
              icon={faBuilding}
              tip='School or Unversity where you have worked'
              value={company}
              color='grey'
              onChange={handleChange}
            />
            <Input
              type='text'
              placeholder='Job title..'
              name='title'
              icon={faGraduationCap}
              tip='Your Job description i.e Frontend , backend developer'
              value={title}
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
              <label htmlFor='current' id='current'>Currently Working</label>
              <input
                id='current'
                type='checkbox'
                name='current'
                value={current}
                checked={current}
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
            <Submit value='Sumbit' />

          </form>
        </div>
      </div>
    </>
  )
}


export default AddExperience