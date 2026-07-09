import React from 'react'
import Unavbar from './Unavbar'
import Banner from '../Components/Banner'
import JourneyPlanner from '../Components/JourneyPlanner'
import MantraScroll from '../Components/MantraScroll'
import Temples from '../Components/Temples'
import Services from '../Components/Services'
import Features from '../Components/Features'
import Footer from '../Components/Footer'
import '../Components/navbar.css'

const Uhome = () => {
  return (
    <div className='class' id='home'>
        <Unavbar/>
        <div className='content'>
         <Banner/>
         <JourneyPlanner/>
         <MantraScroll/>   
         <Temples/>
         <Services/>
         <Features/>
         <Footer/>
        </div>
    </div>
  )
}

export default Uhome