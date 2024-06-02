import React, { useContext, useEffect, useState } from 'react'
import blogContext from '../context/blogcontext';
import { useNavigate } from 'react-router-dom';

function Comments(props) {
  const host = "http://localhost:4000";
  const [arr, setArr] = useState([]);
  const [clicked, serClicked] = useState(1);


  const compare = (a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  }

  const handlecomments = async () => {
    const id = localStorage.getItem('blogId');
    try {
      const response = await fetch(`${host}/api/blog/getblog/${id}`, {
        method: 'GET',
      });
      const json = await response.json();
      const arr1 = JSON.stringify(json.comment);
      const arr2 = JSON.parse(arr1 || "[]");
      arr2.sort(compare);
      setArr(arr2);
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const { addcomment } = useContext(blogContext);
  const navigate = useNavigate();

  useEffect(() => {
    handlecomments();
  }, [clicked]);

  const commentStyle = {
    width: '90%',
    backgroundColor: '#CC8899',
    borderRadius: '10px',

  }
  const [comment, setComment] = useState({ text: '' });
  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  }
  const handleComment = async (e) => {
    if (!localStorage.getItem('username')) navigate('/login')
    e.preventDefault();
    await addcomment(comment.text, localStorage.getItem("blogId"));
    serClicked(clicked + 1);
    setComment({ text: "" });
    handlecomments();
    alert('Comment Added Succefully')
  }

  const handledelete = async (id) => {
    // e.preventDefault;
    console.log('kii')
    const blogId = localStorage.getItem('blogId');
    const response = await fetch(`${host}/api/blog/deletecomment/${blogId}/${id}`, {
      method: 'DELETE',
    });
    serClicked(clicked + 1);
    alert('Comment Deleted')
  }

  return (

    <div>

      { localStorage.getItem('username') && <div className="col-12 py-4">
        <form action="">
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Add Comment</label>
            <input type="text" className="form-control" id="text" onChange={onChange} value={comment.text} name='text' aria-describedby="emailHelp" />
          </div>
          <button onClick={handleComment} type="submit" className="btn border-0" style={{ backgroundColor: '#880ED4', color: 'white' }}>Submit</button>
        </form>
      </div>}

      <div className="col-12 d-flex align-items-center justify-content-center " style={{ flexDirection: 'column' }}>

        {

          arr.length === 0 ? <h4>No Comments</h4>
            : arr.map((ele) => {
              // {console.log(ele.postedby ,localStorage.getItem('username'))}
              return <div key={ele._id} className="comment my-3 px-3 py-3" style={commentStyle}>
                {ele.postedby === localStorage.getItem('username') ? <i className="fa-solid fa-trash" onClick={() => { handledelete(ele._id) }} style={{ float: 'right', fontSize: '20px', cursor: "pointer" }}></i> : ''
                }
                <h5>{ele.postedby} <span style={{ fontSize: '12px' }}>{new Date(ele.date).toLocaleDateString()} - {new Date(ele.date).toLocaleTimeString()}</span></h5>
                <p>{ele.text}</p>
              </div>
            })
        }

      </div>
    </div>
  )
}

export default Comments