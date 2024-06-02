import React from 'react'
import banner from '../images/blog-img.jpeg'
import { Link } from 'react-router-dom'
import Blogs from './Blogs'
import Contact from './Contact'

function Home(props) {

  const bannerStyle = {
    height: '50vh',
    backgroundColor: 'green'
  }


  return (
    <div style={{ border: '0px', marginTop:'3rem' }}>
      <div className="col-12 skewed" style={bannerStyle}>
        <div className="bannertext" style={{backgroundColor:'white'}}>
          <div className="text mt-5">
            <h2 style={{color:'black'}}>Welcome to <span style={{ color: '#880ED4' }}>Blog App</span></h2>
            <p style={{ color: 'grey', fontSize: '17px' }}>Blog writing is crucial as it allows individuals and businesses to share knowledge, express ideas, build authority, engage with audiences, improve SEO, and foster meaningful connections in the digital realm.</p>
            <Link to='/addblog' className="btn" style={{ backgroundColor: '#880ED4', color: 'white' }}>Get Started</Link>
          </div>
        </div>
        <div className="bannerimage border-0">
          <img src={banner} style={{height: '100%', width: '100%' }} alt="" />
        </div>
      </div>

      <div className="col-12 border-0">
        <Blogs mode={props.mode} modeReverse={props.modeReverse} handleMode={props.handleMode} category='Latest' />
      </div>
      <div className=" col-12">
         <Contact />
      </div>
    </div>


  )
}

export default Home