import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  return (
    <section className='home-container'>
      <img src='http://www.pngall.com/wp-content/uploads/2016/03/Light-Bulb-PNG-HD.png' alt='clipart of a lightbulb' className='lightbulb-img'/>
      <h1 className='home-header'>TANDEM FOR 400</h1>
      <p className='home-info'>Train your trivia knowledge!</p>
      <Link to='/play' data-testid='play-button'>Play</Link>
    </section>
  )
}

export default Home;