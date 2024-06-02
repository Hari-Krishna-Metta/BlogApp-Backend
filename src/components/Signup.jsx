import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();
    // const PORT = 3000;
    const host = "http://localhost:4000";
    const [credentials, setCredentials] = useState({ name: "", email: "", cpassword: "", password: "" });


    const handleClick = async (e) => {
        e.preventDefault();
        const {name, email, cpassword, password} = credentials;
        if(cpassword !== password) {
            alert("Password didn't match");
        }
        else {
            // console.log(name, email, password);
            const response = await fetch(`${host}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name, email: email, password: password})
            });
            const json = await response.json();
            // console.log(json)
            if (json.success) {
                localStorage.setItem('username',json.usernamer);
                localStorage.setItem('token', json.authToken);
                navigate('/');
            }
            else {
                alert("Enter Invalid Credentials");
            }
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (

        <div className='container  p-5' style={{color: '#880ED4' }}>
            <div className="container border p-5" style={{marginTop:'6rem'}}>
                <center><h3 className='mb-4' style={{ color: '#880ED4' }}>Sign Up</h3></center>
                <form>
                    <div className="mb-3">
                        <label style={{ fontWeight: '500' }} htmlFor="name" className="form-label">Name : </label>
                        <input type="text" className="form-control" onChange={onChange} name='name' id="name" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label style={{ fontWeight: '500' }} htmlFor="email" className="form-label">Email address :</label>
                        <input type="email" className="form-control" onChange={onChange} name='email' id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label style={{ fontWeight: '500' }} htmlFor="password" className="form-label">Password :</label>
                        <input type="password" className="form-control" onChange={onChange} name='password' id="password" />
                    </div>
                    <div className="mb-3">
                        <label style={{ fontWeight: '500' }} htmlFor="cpassword" className="form-label">Confirm Password :</label>
                        <input type="password" className="form-control" onChange={onChange} name='cpassword' id="cpassword" />
                    </div>
                    <button type="submit" onClick={handleClick} style={{ backgroundColor: '#880ED4', color: 'white' }} className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup