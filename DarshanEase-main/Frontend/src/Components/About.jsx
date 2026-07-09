import React from 'react'
import './navbar.css'

const About = () => {
    return (
        <div id='about' style={{ paddingTop: "80px", maxWidth: "1000px", margin: "0 auto", paddingBottom: "60px", paddingLeft: "20px", paddingRight: "20px" }}>
            <h2 className='text-center' style={{ fontFamily: 'Cinzel, serif', fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '30px' }}>
                About DarshanEase
            </h2>
            
            <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: '15px', boxShadow: 'var(--shadow-md)', lineHeight: "1.8", color: 'var(--text-color)', fontSize: "1.1rem", textAlign: "center" }}>
                <p>
                    DarshanEase is your ultimate gateway to seamless spiritual journeys—empowering devotees to instantly secure Darshan slots, bus, train, and flight tickets all from one exquisitely crafted, unified platform.
                </p>
            </div>
        </div>
    )
}

export default About