import * as mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { Post } from '../models/Post';
import { Like } from '../models/Like';
import { IUser } from '../models/User';

const lookupUser = (field) => [
  {
    $lookup: {
      from: 'users',
      localField: field,
      foreignField: '_id',
      as: field,
    },
  },
  {
    $unwind: '$createdBy',
  },
];

const lookupLiked = (userId) => [
  {
    $lookup: {
      from: 'likes',
      let: {
        match_id: '$_id',
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ['$$match_id', '$post'],
                },
                {
                  $eq: ['$likedBy', mongoose.Types.ObjectId(userId)],
                },
              ],
            },
          },
        },
      ],
      as: 'liked',
    },
  },
  {
    $unwind: {
      path: '$liked',
      preserveNullAndEmptyArrays: true,
    },
  },
];

export const getPosts = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postId;

  try {
    res.formatter.ok(
      await Post.aggregate([
        {
          $match: {
            post: postId && mongoose.Types.ObjectId(postId),
          },
        },
        ...lookupLiked(userId),
        ...lookupUser('createdBy'),
        {
          $sort: { createdAt: -1 },
        },
      ])
    );
  } catch (err) {
    logger.error(err);
    res.formatter.serverError(err.message);
  }
};

export const getPostByID = async (req, res) => {
  const userId = req.user._id;

  try {
    res.formatter.ok(
      (
        await Post.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(req.params.postId),
            },
          },
          ...lookupLiked(userId),
          ...lookupUser('createdBy'),
        ])
      )[0]
    );
  } catch (err) {
    logger.error(err);
    res.formatter.serverError(err.message);
  }
};

export const createPost = async (req, res) => {
  const { title, body } = req.body;
  const postId = req.params.postId;
  const user: IUser = req.user;

  try {
    if (postId) {
      await Post.findByIdAndUpdate(postId, {
        $inc: {
          'computed.answers': 1,
        },
      });
    }

    const post = await new Post({
      title,
      body,
      post: postId,
      createdBy: user._id,
    }).save();

    res.formatter.ok(await Post.findById(post._id).populate('createdBy'));
  } catch (err) {
    logger.error(err);
    res.formatter.serverError(err.message);
  }
};

export const editPost = async (req, res) => {
  const { title, body } = req.body;
  const postId = req.params.postId;

  try {
    res.formatter.ok(
      await Post.findByIdAndUpdate(postId, {
        title,
        body,
      }).populate('createdBy')
    );
  } catch (err) {
    logger.error(err);
    res.formatter.serverError(err.message);
  }
};

export const likePost = async (req, res) => {
  const postId = req.params.postId;
  const user = req.user;

  try {
    let liked = await Like.findOne({
      post: postId,
      likedBy: user._id,
    });

    if (liked) {
      await Like.deleteOne({
        post: postId,
        likedBy: user._id,
      });
      liked = undefined;
    } else {
      liked = await new Like({
        post: postId,
        likedBy: user._id,
      }).save();
    }

    res.formatter.ok({
      ...(await Post.findByIdAndUpdate(
        postId,
        {
          $inc: { 'computed.likes': liked ? 1 : -1 },
        },
        { new: true }
      ).lean()),
      liked,
    });
  } catch (err) {
    logger.error(err);
    res.formatter.serverError(err.message);
  }
};
