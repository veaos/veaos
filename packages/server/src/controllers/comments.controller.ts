import { IUser } from '../models/User';
import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

export const getComments = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    res.formatter.ok(
      await Comment.find({ post: postId }).populate('createdBy')
    );
  } catch (err) {
    next(err);
  }
};

export const createComment = async (req, res, next) => {
  const { body } = req.body;
  const postId = req.params.postId;
  const user: IUser = req.user;

  try {
    if (postId) {
      await Post.findByIdAndUpdate(postId, {
        $inc: {
          'computed.comments': 1,
        },
      });
    }

    const comment = await new Comment({
      body,
      post: postId,
      createdBy: user._id,
    }).save();

    res.formatter.ok(await Comment.findById(comment._id).populate('createdBy'));
  } catch (err) {
    next(err);
  }
};

export const editComment = async (req, res, next) => {
  const { body } = req.body;
  const { commentId } = req.params;
  const userId = req.user._id;

  try {
    try {
      res.formatter.ok(
        await Comment.findOneAndUpdate(
          { _id: commentId, createdBy: userId },
          {
            body,
          },
          { new: true }
        ).populate('createdBy')
      );
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;

  try {
    await Comment.deleteOne({ _id: commentId, createdBy: userId });
    res.formatter.ok();
  } catch (err) {
    next(err);
  }
};
