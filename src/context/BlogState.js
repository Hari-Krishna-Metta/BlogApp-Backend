import { useState } from 'react';
import BlogContext from './blogcontext';



const BlogState = (props) => {
    const host = "http://localhost:4000";

    const intialBlogs = [];
    const [blogs, setBlogs] = useState(intialBlogs);
    const [presents, setPresents] = useState([]);
    const [bloguser, setBloguser] = useState([]);
    const [blogcomment, setBlogcomment] = useState([]);
    // const [blog, setBlog] = useState(null);

    // getting all blogs 
    const getallblogs = async () => {
        try {
            const response = await fetch(`${host}/api/blog/getallblogs`, {
                method: 'GET',

            });
            const json = await response.json();
            const arr = json.reverse();
            setBlogs(arr);
        } catch (err) {
            console.error(err.message);
            // res.status(500).send("Internal Error Occured");
        }
    }
    const getblogbyid = async (id) => {
        const response = await fetch(`${host}/api/blog/getblog/${id}`, {
            method: 'GET',
        });
        const json = await response.json();
        const arr = await json.comment;
        setBlogcomment(arr);
        setPresents(json);
    }

    const getuserbyid = async (id) => {
        const response = await fetch(`${host}/api/auth/getuser/${id}`, {
            method: 'GET',
        });
        const json = await response.json();
        setBloguser(json);
    }


    const addBlog = async (title, description, category, image) => {
        try {
            const response = await fetch(`${host}/api/blog/addblog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, category, image })
            });
            const json = await response.json();
            // console.log(json);
            return {"error":0};
        } catch (err) {
            // console.error(err.message);
            return {"error":1};
            // res.status(500).send("Internal Error Occured");
        }
    }

    const updateBlog = async(title, description, category, image)=>{
        try {
            const id = localStorage.getItem('blogId');
            const response = await fetch(`${host}/api/blog/updateblog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, category, image })
            });
            const json = await response.json();
            return {"error":0};
        } catch (err) {
            console.error(err.message);
            return {"error":1};
            // res.status(500).send("Internal Error Occured");
        }
    }

    const addcomment = async(text,id)=>{
        try {
            const response = await fetch(`${host}/api/blog/addcomment/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ text })
            });
            const json = await response.json();
            console.log("comment added");
            console.log(json);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <BlogContext.Provider value={{ blogs, getallblogs, presents, setPresents, getblogbyid, bloguser, getuserbyid, blogcomment, addBlog , addcomment,updateBlog}}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState