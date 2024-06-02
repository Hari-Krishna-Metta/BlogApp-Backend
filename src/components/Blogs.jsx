import React, { useContext, useEffect } from 'react'
import blogContext from '../context/blogcontext'
import BlogItem from './BlogItem';

function Blogs(props) {

  const category = props.category;
  const {blogs}  = useContext(blogContext);
  const {getallblogs}  = useContext(blogContext);
  
  useEffect(()=>{
    getallblogs();
  },[]);
  let c=0;
  let blogc=0;
  return (
    <div className='row d-flex align-items-center justify-content-center mx-4 mt-4'>
      
        <center><h3 className='mb-4' style={{color:'#880ED4',fontWeight:'700'}}>{category.charAt(0).toUpperCase() + category.slice(1)} Blogs</h3></center>
        {
            
            blogs.map((ele)=>{
               c+=1;
               if(c>2 && category==='Latest') return
               if(category==='Latest'){
                blogc+=1
               return <BlogItem mode={props.mode} modeReverse={props.modeReverse} handleMode={props.handleMode} key={ele._id} blog={ele} />
               }
               else if(category==='all') {
                blogc+=1
               return <BlogItem mode={props.mode} modeReverse={props.modeReverse} handleMode={props.handleMode} key={ele._id} blog={ele} />
               }
               else if( ele.category===category ){
                blogc+=1
               return <BlogItem mode={props.mode} modeReverse={props.modeReverse} handleMode={props.handleMode} key={ele._id} blog={ele} />
               }
            
            }) 
        }
        {blogc==0 && <center><h5>No {category} Blogs Found</h5></center>}
    </div>
  )
}

export default Blogs