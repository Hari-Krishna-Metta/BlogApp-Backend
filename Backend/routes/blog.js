const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


router.post('/addblog', fetchuser, [
    body('title', 'Enter Valid Title').isLength({ min: 3 }),
    body('description', 'Description Should Be atleast Length Of 300').isLength({ min: 300 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send('Enter ccc');
    }
    else {
        try {
            const { title, description, category, image } = req.body;
            const blog = new Blog({
                title, description, category, image, user: req.user.id
            })
            blog.save();
            console.log(req.user.id);
            res.json(blog);

        } catch (err) {
            console.error(err.message + req.user.id);
            res.status(500).send("Internal Error Occured");
        }
    }
});

router.get('/getuserblogs', fetchuser, async (req, res) => {
    try {
        const blog = await Blog.find({ user: req.user.id });
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Error Occured");
    }
});


router.get('/getallblogs', async (req, res) => {
    try {
        const blog = await Blog.find({});
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Error Occured");
    }
});

// get blog by id
router.get('/getblog/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Error Occured");
    }
});


router.delete('/deleteblog/:id', fetchuser,
    async (req, res) => {

        const { title, description, tag, image } = req.body;
        // find note to be updated
        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(401).send("not found");
        }
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("not found");
        }
        blog = await Blog.findByIdAndDelete(req.params.id);
        res.json({ "Successfully deleted": blog });

    });


router.put('/updateblog/:id', fetchuser, [body('title', 'Enter Valid Title').isLength({ min: 3 }),
body('description', 'Description Should Be atleast Length Of 300').isLength({ min: 300 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send('Enter ccc');
        }
        else {
            const { title, description, tag, image } = req.body;
            // create new note object
            const newBlog = {};
            if (title) {
                newBlog.title = title;
            }
            if (description) {
                newBlog.description = description;
            }
            if (tag) {
                newBlog.tag = tag;
            }
            if (image) {
                newBlog.image = image;
            }
            // find note to be updated
            let blog = await Blog.findById(req.params.id);
            if (!blog) {
                return res.status(401).send(" 1 not found");
            }
            if (blog.user.toString() !== req.user.id) {
                return res.status(401).send("not found");
            }
            blog = await Blog.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true });
            res.json(blog);
        }
    });


// comments 
router.post('/addcomment/:id', fetchuser, [
    body('text', 'Enter Minimum of one letter').isLength({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            // console.log(req.params.id);
            const { text } = req.body;
            const postedby = req.user.id;
            console.log(text, postedby);
            const user = await User.findById(postedby);

            var com = { text: text, postedby: user.name };
            let blog = await Blog.findById(req.params.id);
            blog.comment.push(com);
            blog.save();
            res.json(blog);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Error Occured");
        }
    }
});


router.delete('/deletecomment/:id/:commentid', async (req, res) => {
    let blog = await Blog.findById(req.params.id);
    blog.comment.pull({ _id: req.params.commentid });
    blog.save();
    res.json({ "Successfully deleted comment": blog });
});

module.exports = router