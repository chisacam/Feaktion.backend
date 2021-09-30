import { Router } from 'express'
import { authToken } from '../../../middleware/tokenVerify'
import CommentController from '../controller'

const router = Router({
    mergeParams: true
})

router.patch('/:comment_id', authToken, CommentController.updateComment)
router.post('/', authToken, CommentController.postComment)
router.delete('/:comment_id', authToken, CommentController.isCommentWriter, CommentController.deleteComment)

export default router