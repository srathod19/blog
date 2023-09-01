const express = require('express');
const conn = require('../../config/database');
const router = express.Router();
const blog_model = require('./blog_model')
const { body, validationResult } = require('express-validator');

router.post('/createBlog',
    body('title').isLength({ min: 1 }),
    body('description').isLength({ min: 1 }),
    body('category').isLength({ min: 1 }),
    (req, res) => {
        // console.log('done')
        const result = validationResult(req);
        // console.log(result.array())
        // return
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        } else {
            // res.json({ 'data': req.body })
            blog_model.createBlog(req, res);
        }
    });
router.post('/getList', function (req, res) {
    blog_model.getList(req, res);
})
router.post('/editBlog', function (req, res) {
    blog_model.editBlog(req, res);
})
router.post('/deleteBlog', function (req, res) {
    blog_model.deleteBlog(req, res);
})
module.exports = router;