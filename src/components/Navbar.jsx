
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function Navbar(props) {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        console.log('logout')
        navigate('/');
    }
  return (
    <div className='fixed-top'>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode}  bg-${props.mode} p-3`} style={{borderBottom:'1px solid #D3D3D3'}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{fontWeight:'700',color:'#880ED4'}}>

                        {(localStorage.getItem('username')?"Welcome, "+ localStorage.getItem('username'):"BlogingApp")}
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        {/* Menu */}
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <div className="mx-auto"></div>
                        <ul className="navbar-nav mb-lg-0 " >
                            <li className="nav-item" >
                                <Link className={`nav-link text-${props.modeReverse}`}  aria-current="page" to="/" style={{color:'black'}}>Home</Link>
                            </li>
                            <li className="nav-item" >
                                <Link className={`nav-link text-${props.modeReverse}`} aria-current="page" to="/addblog" style={{color:'black'}}>Write Blog</Link>
                            </li>
                        </ul>
                        <div className="d-flex navbar-nav align-items-center justify-content-center">
                            <i className="mx-2" onClick={props.handleMode} style={{color:'#880ED4',fontSize:'30px' , cursor:'pointer'}}><FontAwesomeIcon icon={faMoon} /></i>
                            {!localStorage.getItem('token') ?
                            <>

                            <Link to='/login'  className="btn mx-1 my-2" style={{backgroundColor:'#880ED4',color:'white'}}>Login</Link>
                            <Link to='/signup' className="btn mx-1 my-2 " style={{backgroundColor:'#880ED4',color:'white'}}>SignUp</Link>
                            </>
                            :
                            <>
                            <button onClick={handleLogout} className="btn mx-1" style={{backgroundColor:'#880ED4',color:'white'}}>LogOut</button>
                            </>}
                        </div>

                    </div>
                </div>
            </nav>


            <nav className={`navbar navbar-expand-lg  bg-${props.mode} p-1 shadow`} >
                <div className="container-fluid">
                    <button className="navbar-toggler mx-auto border-0" type="button" data-bs-toggle="collapse" data-bs-target="#Categories" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        Categories
                    </button>
                    <div className="collapse navbar-collapse" id="Categories">
                        {/* <div className="mx-auto"></div> */}
                        <ul className="navbar-nav mx-auto mb-lg-0" >
                            <li className="nav-item" >
                                <Link className="nav-link" aria-current="page" to="/blogs" style={{color:'#880ED4',fontWeight:'500'}}>All</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/art" style={{color:'#880ED4',fontWeight:'500'}}>Art</Link>
                            </li>
                            <li className="nav-item" >
                                <Link className="nav-link" aria-current="page" to="/science" style={{color:'#880ED4',fontWeight:'500'}}>Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/technology" style={{color:'#880ED4',fontWeight:'500'}}>Technology</Link>
                            </li>
                            <li className="nav-item" >
                                <Link className="nav-link" aria-current="page" to="/entertainment" style={{color:'#880ED4',fontWeight:'500'}}>Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/food" style={{color:'#880ED4',fontWeight:'500'}}>Food</Link>
                            </li>
                            <li className="nav-item" >
                                <Link className="nav-link" aria-current="page" to="/sports" style={{color:'#880ED4',fontWeight:'500'}}>Sports</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar