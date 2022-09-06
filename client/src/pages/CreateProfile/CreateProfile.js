import React, { useState } from 'react';
import {
    faBuilding,
    faGlobe,
    faMapLocation,
    faTools,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import facebookIcon from '../../assets/facebook.png';
import instagramIcon from '../../assets/instagram.png';
import twitterIcon from '../../assets/twitter.png';
import linkedinIcon from '../../assets/linkedin.png';
import youtubeIcon from '../../assets/youtube.png';
import './CreateProfile.scss';
import Input from '../../components/Form/Input/Input';
import TextArea from '../../components/Form/Input/TextArea';
import Dropdown from '../../components/Form/Input/Dropdown';
import Submit from '../../components/Form/Input/Submit';
import Navbar from '../../components/Navbar/Navbar';
import FooterLine from '../../components/FooterLine';
const data = [
    { id: 1, value: 'MERN Stack Developer' },
    { id: 2, value: 'MEAN Stack Developer' },
    { id: 3, value: 'Frontend Developer' },
    { id: 4, value: 'Backend Developer' },
    { id: 5, value: 'PHP Developer' },
    { id: 6, value: 'Full Stack Developer' },
    { id: 8, value: '.Net Developer' },
    { id: 9, value: 'Android Developer' },
    { id: 10, value: 'iOs Developer' },
    { id: 11, value: 'DevOps' },
];
const CreateProfile = () => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        status: '',
        bio: '',
        skills: '',
        githubusername: '',
        location: '',
        youtube: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
    });

    const {
        company,
        website,
        status,
        bio,
        skills,
        githubusername,
        location,
        youtube,
        facebook,
        twitter,
        linkedin,
        instagram,
    } = formData;
    const handleChange = (e) => {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            company: '',
            website: '',
            status: '',
            bio: '',
            skills: '',
            githubusername: '',
            location: '',
            youtube: '',
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: '',
        });
    };

    return (
        <>
            <Navbar></Navbar>
            <div className='createProfile-container'>
                <div className='createProfile-body'>
                    <section className='form-area'>
                        <div className='title'>
                            <h3>
                                Add Basic Info <span>(Required)</span>
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <Dropdown
                                icon={faBuilding}
                                tip='Your own company or where you work'
                                value={status}
                                color='grey'
                                data={data}
                                defaultTitle='Select Professional Status'
                                name='status'
                                onChange={handleChange}
                            />
                            <Input
                                type='text'
                                placeholder='Company...'
                                name='company'
                                icon={faBuilding}
                                tip='Your own company or where you work'
                                value={company}
                                color='grey'
                                onChange={handleChange}
                            />
                            <Input
                                type='text'
                                placeholder='Website...'
                                name='website'
                                icon={faGlobe}
                                tip='Your own website or where you work'
                                color='grey'
                                value={website}
                                onChange={handleChange}
                            />
                            <Input
                                type='text'
                                placeholder='Location...'
                                name='location'
                                icon={faMapLocation}
                                tip='City & state i.e (Karachi, PK)'
                                value={location}
                                color='grey'
                                onChange={handleChange}
                            />
                            <Input
                                type='text'
                                placeholder='Skills...'
                                name='skills'
                                icon={faTools}
                                tip='Kindly use comma seperated values i.e (CSS,HTML,javaScript)'
                                value={skills}
                                color='grey'
                                onChange={handleChange}
                            />
                            <Input
                                type='text'
                                placeholder='GitHub Username...'
                                name='githubusername'
                                icon={faGithub}
                                tip='If you want your github latest repos to be displayed'
                                value={githubusername}
                                color='grey'
                                onChange={handleChange}
                            />
                            <TextArea
                                placeholder='A Short Bio... '
                                onChange={handleChange}
                                value={bio}
                                name='bio'
                                tip='Anything good about you, i.e Inroduction'
                                error=''
                                color='grey'
                            />

                            <div className='social'>
                                <div className='title'>
                                    <h3>
                                        Add Social Links <span>(Optional)</span>
                                    </h3>
                                </div>
                                <div className='link twitter'>
                                    <img src={twitterIcon} alt='' />
                                    <Input
                                        type='text'
                                        placeholder='Twitter link...'
                                        name='twitter'
                                        value={twitter}
                                        color='grey'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='link facebook'>
                                    <img src={facebookIcon} alt='' />
                                    <Input
                                        type='text'
                                        placeholder='Instagram Link...'
                                        name='facebook'
                                        // icon={faGithub}

                                        value={facebook}
                                        color='grey'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='link linkedIn'>
                                    <img src={linkedinIcon} alt='' />
                                    <Input
                                        type='text'
                                        placeholder='linkedIn link...'
                                        name='linkedin'
                                        value={linkedin}
                                        color='grey'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='link youtube'>
                                    <img
                                        src={youtubeIcon}
                                        alt=''
                                        width={'54'}
                                        style={{ margin: '0 1.5px' }}
                                    />
                                    <Input
                                        type='text'
                                        placeholder='Youtube Link...'
                                        name='youtube'
                                        value={youtube}
                                        color='grey'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='link instagam'>
                                    <img src={instagramIcon} alt='' />
                                    <Input
                                        type='text'
                                        placeholder='Instagam Link...'
                                        name='instagram'
                                        value={instagram}
                                        color='grey'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <Submit value='Sumbit' />
                            <div className='already-confirm'></div>
                        </form>
                    </section>
                </div>
            </div>
            <FooterLine />
        </>
    );
};

export default CreateProfile;
