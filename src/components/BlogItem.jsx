import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function BlogItem(props) {
  const host = "http://localhost:4000";
  const navigate = useNavigate();

  const { blog } = props


  const handleId = async (id)=>{
    localStorage.setItem("blogId",id);
    try {
      const response = await fetch(`${host}/api/blog/getblog/${id}`,{
        method:'GET',
      });
      const json = await response.json(); 
      localStorage.setItem('userId',json.user);
      const arr = JSON.stringify(json.comment);
      localStorage.setItem('commentarr',arr);
      navigate("/openblog");

    } catch (err) {
      console.error(err.message);
    }
  }

  
  return (
    <div className='col-md-6 my-3 py-4' >

{/*       
      <div className="card">
        <img src={blog.image} height={'400px'} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text"  dangerouslySetInnerHTML={{ __html: blog.description.slice(0,200)+"............" }}></p>
            <Link onClick={()=>{handleId(blog._id)}}  className="btn btn-primary">Read More</Link>
          </div>
      </div> */}
{/* {console.log(props.mode)} */}

      <div className={`blogitem d-flex shadow-lg bg-${props.mode}`}>
         <div className="image-content">
            <div className="image">
               <img src={blog.image} alt="" />
            </div>
            <div className="interactions">
             <h6 style={{ color: '#880ED4' , fontSize: '17px' }}>Category: <span style={{ color: 'grey', fontSize: '15px' }}>{blog.category}</span></h6> 
             <h6 style={{ color: '#880ED4' , fontSize: '17px' }}>Posted On : <span style={{ color: 'grey', fontSize: '15px' }}>{ new Date(blog.date).toLocaleDateString()} { new Date(blog.date).toLocaleTimeString()}</span></h6> 
             {/* <i class="fa-solid fa-heart" style={{ color: '#880ED4' , fontSize: '17px' }}></i> <span className='me-3' style={{ color: 'grey', fontSize: '15px' }}>23</span>
             <i class="fa-solid fa-eye" style={{ color: '#880ED4' , fontSize: '17px' }}></i> <span style={{ color: 'grey', fontSize: '15px' }}>23</span> */}
            </div>
         </div>
            <div className="content">
                <h5 style={{ color: '#880ED4' }}>{blog.title.slice(0,30)+" . . ."}</h5>
                <p style={{ color: 'grey', fontSize: '17px' }} dangerouslySetInnerHTML={{ __html: blog.description.slice(0,250) +"   . . . ." }}></p>
                <Link onClick={()=>{handleId(blog._id)}}  style={{ backgroundColor: '#880ED4', color: 'white' }} className="btn ">Read More</Link>
            </div>

      </div>
    </div>
  )
}

export default BlogItem