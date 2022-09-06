import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';
import Specification from '../Specification/Specification';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Specification />
            <Footer />
        </>
    );
};

export default Home;
