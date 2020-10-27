import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  return (
    <section className='home-container'>
      <h1 className='home-header'>Tandem for 400</h1>
      <p className='home-info'>Train your trivia knowledge!</p>
      <Link to='/play'>Play</Link>
    </section>
  )
}

export default Home;