const express = require("express");
const router = express.Router();

const comments = require("../data/comments");

router
.route('/')
// GET /comments
.get((req, res) => {
  res.json(comments);
})
// POST /comments
.post((req, res) => {
  const { userId, postId, body } = req.body;
  const comment = {
      id,
      userId,
      postId,
      body
  };
  comments.push(comment);
  res.status(201).json(comment);
});
// GET /comments?userId=<VALUE>
router.get('/', (req, res) => {
  const userId = req.query.userId;
  const userComments = comments.filter(comment => comment.userId === userId);
  res.json(userComments);
});
// GET /comments?postId=<VALUE>
router.get('/', (req, res) => {
  const postId = req.query.postId;
  const postComments = comments.filter(comment => comment.postId === postId);
  res.json(postComments);
});

router
.route('/:id')
// GET /comments/:id
.get((req, res) => {
    const commentId = req.params.id;
    const comment = comments.find(comment => comment.id === commentId);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
})
// PATCH /comments/:id
.patch((req, res) => {
    const commentId = req.params.id;
    const updatedBody = req.body.body;
    const comment = comments.find(comment => comment.id === commentId);
    if (comment) {
        comment.body = updatedBody;
        res.json(comment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
})
// DELETE /comments/:id
.delete((req, res) => {
    const commentId = req.params.id;
    comments = comments.filter(comment => comment.id !== commentId);
    res.sendStatus(204);
});




module.exports = router;