import React from 'react'
import './navbar.css'
import Banner from './Banner'
import JourneyPlanner from './JourneyPlanner'
import MantraScroll from './MantraScroll'
import Temples from './Temples'
import TempleGallery from './TempleGallery'
import About from './About'
import Footer from './Footer'
import NavBar from './Navbar'
import Services from './Services'
import Features from './Features'
import ScrollSpy from './ScrollSpy'

const Home = () => {
  return (
    <div className='class' id='home'>
        <NavBar/>
        <div className='content'>
         <ScrollSpy />
         <div id="hero">
           <Banner/>
           <JourneyPlanner/>
           <MantraScroll/>   
         </div>
         <div id="temples">
           <Temples/>
           <TempleGallery />
         </div>
         <div id="blogs">
           <About/>
         </div>
         <div id="services">
           <Services/>
           <Features/>
         </div>
         <div id="footer">
           <Footer/>
         </div>
        </div>
    </div>
  )
}

export default Home;