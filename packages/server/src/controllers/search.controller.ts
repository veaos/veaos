import { Post } from '../models/Post';

export const search = async (req, res) => {
  const { query, skip, limit } = req.query;

  res.formatter.ok(
    await Post.find({
      $or: [{ body: { $regex: query } }, { title: { $regex: query } }],
    })
      .skip(Number(skip))
      .limit(Number(limit))
  );
};
