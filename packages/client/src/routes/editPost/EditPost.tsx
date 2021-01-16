import React from 'react';
import { useHistory } from 'react-router-dom';
import { PostEditor } from '../../components/PostEditor/PostEditor';
import { useEditPost, useGetPost } from '../../actions/post.actions';

export const EditPostRoute = ({
  match: {
    params: { id },
  },
}) => {
  const { data, isLoading } = useGetPost({ postId: id });
  const { mutate, isSuccess } = useEditPost({ postId: id });
  const history = useHistory();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isSuccess) {
    history.push(`/question/${data.post || data._id}`);
  }

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-5">
        <PostEditor
          noTitle={Boolean(data.post)}
          submitButtonText="Save Edits"
          initialData={data}
          mutate={mutate}
        />
      </div>
      <div className="col-span-2">ff</div>
    </div>
  );
};
