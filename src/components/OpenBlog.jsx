import React, { useContext, useEffect, useState } from 'react'
import blogContext from '../context/blogcontext'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments';

function OpenBLog() {
  const host = "http://localhost:4000";
  const imageStyle = {
    width: '100%',
    height: '400px'
  }



  const navigate = useNavigate();
  const { presents, getblogbyid, bloguser, getuserbyid, addcomment } = useContext(blogContext);



  useEffect(() => {
    const id = localStorage.getItem("blogId");
    const userid = localStorage.getItem("userId");
    getblogbyid(id);
    getuserbyid(userid);
  }, []);


  const handledelete = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem('blogId');
    const response = await fetch(`${host}/api/blog/deleteblog/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    console.log('deleted');
    alert('Blog Deleted')
    navigate('/blogs');

  }

  const handleupdate = (e)=>{
    e.preventDefault();
    console.log(presents.title);
    navigate('/updateblog')

  }


  const arr = JSON.parse(localStorage.getItem("commentarr") || "[]");

  return (
    <div >
      <div className="container border p-0">
        <div className="col-12">
          <img src={presents.image} style={imageStyle} alt="" />
        </div>
        <div className="col-12 pt-2 pb-2 d-flex align-items-center justify-content-center border-top border-bottom" >
          <center>
            <h4 style={{ color: '#880ED4', fontWeight: '600' }}>{presents.title}</h4>
            <b>Category</b> : {presents.category} <br />
            <b>Author</b> : {bloguser.name} <br />
            <b>Email</b> : {bloguser.email} <br />
            {
              bloguser.name === localStorage.getItem('username') &&
              <>
                <button onClick={handleupdate} className="btn btn-primary my-2 mx-2 border-0" style={{ backgroundColor: '#880ED4', color: 'white' }}>
                  <i className="fa-solid fa-pen"></i> Update
                </button>
                <button onClick={handledelete} className="btn btn-primary my-2 mx-2 border-0" style={{ backgroundColor: '#880ED4', color: 'white' }}>
                  <i className="fa-solid fa-trash"></i> Delete
                </button>
              </>

            }

          </center>
        </div>
        <div className="description col-12 px-4 py-2 border-bottom">
          <h4>{presents.title}</h4>
          <p dangerouslySetInnerHTML={{ __html: presents.description }} ></p>
        </div>
        <div className="comment col-12 px-4 py-3">
          <h5 style={{ color: '#880ED4' }}>Comment</h5>


          <Comments blogId={presents._id} bloguser={bloguser} />
        </div>
      </div>
    </div>
  )
}

export default OpenBLog