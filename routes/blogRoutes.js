const express = require('express');
const blogController = require('../controllers/blogController')
const router = express.Router();

router.get('/', blogController.blog_index)
router.post('/', blogController.blog_create_post)
router.get('/create', blogController.blog_create_get) // getting create doesn't work below the /blogs/:id routes because it thinks 'create' is a potential id, causing the create file to not render
router.get('/:id', blogController.blog_details)
router.delete('/:id', blogController.blog_delete)

module.exports = router;