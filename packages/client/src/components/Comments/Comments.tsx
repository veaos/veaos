import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useForm } from 'react-hook-form';
import {
  useCreateComment,
  useDeleteComment,
  useGetComments,
  useUpdateComment,
} from '../../actions/comment.actions';

import { Markdown } from '../Markdown/Markdown';
import { TextField } from '../UI/TextField';
import { Button } from '../UI/Button';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { useAuth } from '../../context/AuthContext';

const CommentEditor = ({
  onSubmit,
  editMode,
  onCancel,
  initialData,
}: {
  onSubmit: (data: any) => void;
  initialData?: any;
  editMode?: boolean;
  onCancel?: () => void;
}) => {
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initialData,
  });

  return (
    <form
      className="flex items-start gap-4"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <TextField
        error={errors.body}
        ref={register({ required: true })}
        name="body"
        className="text-sm"
        multiline
      />
      <div className="space-y-1">
        <Button type="submit" className="whitespace-nowrap">
          {editMode ? 'Save Edits' : 'Add Comment'}
        </Button>
        {editMode ? (
          <button
            className="focus:outline-none text-blue-400"
            onClick={onCancel}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
};

const Comment = ({ body, createdBy, createdAt, onDelete, onUpdate }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const iam = user._id === createdBy._id;

  const transpile = { code: 'inlineCode' };

  return (
    <div className="group border-t border-gray-200 py-2 text-sm min-h-12">
      {editMode ? (
        <CommentEditor
          onSubmit={(data) => {
            onUpdate(data);
            setEditMode(false);
          }}
          editMode={true}
          initialData={{ body }}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          <DeleteModal
            title="Are your sure you want to delete this comment?"
            onDelete={onDelete}
            open={open}
            setOpen={setOpen}
          >
            This action cannot be undone
          </DeleteModal>

          <Markdown transpile={transpile}>
            {body.replace(/[\n\r]/g, '')}
          </Markdown>
          <span className="ml-1">
            <Link
              to={`/users/${createdBy._id}`}
              className={`text-blue-400 rounded py-0.5 px-1 ${
                iam ? 'bg-blue-50' : null
              }`}
            >
              {createdBy.name}
            </Link>
          </span>
          <span className="ml-1 text-gray-500">
            {formatDistanceToNow(new Date(createdAt))}
          </span>
          {iam ? (
            <>
              <button
                className="group-hover:opacity-100 opacity-0 text-blue-400 ml-1 focus:outline-none"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
              <button
                className="group-hover:opacity-100 opacity-0 text-red-600 ml-1 focus:outline-none"
                onClick={() => setOpen(true)}
              >
                Delete
              </button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export const Comments = ({ postId }) => {
  const { data } = useGetComments({ postId });
  const { mutate } = useCreateComment({ postId });
  const { mutate: deleteCommentMutate } = useDeleteComment({ postId });
  const { mutate: updateCommentMutate } = useUpdateComment({ postId });
  const [addCommentState, setAddCommentState] = useState(false);

  const onSubmit = (data) => {
    mutate(data);
    setAddCommentState(false);
  };

  return (
    <div className="mt-6">
      <div>
        {Array.isArray(data) &&
          data.map((data, i) => (
            <Comment
              {...data}
              onDelete={() => deleteCommentMutate({ commentId: data._id })}
              onUpdate={(updatedData) =>
                updateCommentMutate({ commentId: data._id, updatedData })
              }
              key={i}
            />
          ))}
      </div>
      {addCommentState ? (
        <CommentEditor onSubmit={onSubmit} />
      ) : (
        <span
          onClick={() => setAddCommentState(true)}
          className="text-sm text-blue-400 cursor-pointer"
        >
          add a comment
        </span>
      )}
    </div>
  );
};
