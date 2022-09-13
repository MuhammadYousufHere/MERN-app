const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const Post = require('../../model/Post');
const { check, validationResult } = require('express-validator');

// using express routes
const router = express.Router();

// @route  POST api/posts
// @desc   Create a post
// @access Private

router.post(
  '/',
  [auth, [check('text', 'Field should not be empty').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // get user w/o password
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error :(');
    }
  }
);

// @route  GET api/posts
// @desc   get all post
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error :(');
  }
});


// @route  GET api/posts/:post_id
// @desc   get post by id
// @access Private
router.get('/:posts_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.posts_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error :(');
  }
});

// @route  Delete api/posts/:post_id
// @desc   delete post by id
// @access Private

router.delete('/:posts_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.posts_id);
    //
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post has been deleted' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error :(');
  }
});

// @route  PUT api/posts/like/:post_id
// @desc   like post by id
// @access Private

router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error :(');
  }
});

// @route  PUT api/posts/unlike/:post_id
// @desc   like post by id
// @access Private

router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if post is not liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post is not liked yet' });
    }
    // get remove index

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error :(');
  }
});

// @route  POST api/posts/comment/:post_id
// @desc   Comment on a post
// @access Private

router.post(
  '/comment/:post_id',
  [auth, [check('text', 'Field should not be empty').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // get user w/o password
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.post_id);
      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      // add to comments
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error :(');
    }
  }
);

// @route  DELETE api/posts/comment/:post_id/:comment_id
// @desc   delete a post
// @access Private

router.delete('/comment/:post_id/:comment_id', [
  auth,
  async (req, res) => {
    try {
      // get the post
      const post = await Post.findById(req.params.post_id);

      // pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // check if there's a comment

      if (!comment) {
        return res.status(404).json({ msg: 'No comments found' });
      }

      // check authorized user

      if (comment.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({
            msg: 'You are not authorized hence, cannot delete this comment',
          });
      }
      //
      // get remove index

      const removeIndex = post.comments
        .map((comment) => comment.user.toString())
        .indexOf(req.user.id);

      post.comments.splice(removeIndex, 1);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error :(');
    }
  },
]);

module.exports = router;
