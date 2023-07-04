import express from 'express';
import { createPost , updatePost , getAllPosts , getPost , deletePost } from '../controllers/postController';
import { createComment , getAllComments  , deleteComment} from '../controllers/commentController';
import { getAllRepliesForThatComment , createReplieToComment  , deleteReply} from '../controllers/replyController';
const router = express.Router();

router.get('/posts' , getAllPosts)
router.get('/posts/:postId' , getPost)
router.post('/posts/',createPost)
router.patch('/posts/:postId' , updatePost)
router.delete('/posts/:postId' , deletePost);
router.get('/posts/:postId/comments' , getAllComments)
router.post('/posts/:postId/comments',createComment)
router.delete('/posts/comments/:commentId' , deleteComment)
router.get('/posts/comments/:commentId/replies', getAllRepliesForThatComment);
router.post('/posts/comments/:commentId/replies' , createReplieToComment);
router.delete('/posts/comments/replies/:replyId' , deleteReply);

export default router;