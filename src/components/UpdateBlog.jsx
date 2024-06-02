import React from 'react'
import JoditEditor, { Jodit } from 'jodit-react'
import { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import blogContext from '../context/blogcontext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function UpdateBlog() {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);
    const navigate = useNavigate();
    const editor = useRef(null);
    // const [content, setContent] = useState('');
    const { presents, setPresents, updateBlog } = useContext(blogContext);


    const onChange = (e) => {
        setPresents({ ...presents, [e.target.name]: e.target.value });
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (presents.image === '') {
            alert('Enter image url ')
            navigate('/updateblog');
        }
        else {
            const response = await updateBlog(presents.title, presents.description, presents.category, presents.image);
            if (response.error) {
                alert('Maintain minimum lengths')
                navigate('/updateblog');
            }
            else {
                setPresents({ title: "", description: "", category: "General", image: "" });
                alert('Blog Updated Succefully')
                navigate('/openblog')
            }
        }
    }

    return (
        <div className='container p-5'>
            {/* {JSON.stringify(presents)} */}
            <div className="border p-4">
                <center><h4>Update Your Blog</h4></center>
                {/* {presents.title+""} */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title Of the Blog :</label>
                        <input type="email" className="form-control" id="title" name='title' value={presents.title} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <JoditEditor className='mb-3'
                        ref={editor}
                        value={presents.description}
                        onChange={newContent => setPresents({ ...presents, 'description': (newContent) })}
                    />

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Category :</label>
                        <select className="form-select" name='category' value={presents.category} onChange={onChange} aria-label="Default select example">
                            <option defaultValue="General">General</option>
                            <option value="Art">Art</option>
                            <option value="Science">Science</option>
                            <option value="Technology">Technology</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Food">Food</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Enter Poster URL :</label>
                        <input type="text" className="form-control" value={presents.image} onChange={onChange} id="image" name='image' aria-describedby="emailHelp" />
                    </div>
                    <button onClick={handlesubmit} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateBlog