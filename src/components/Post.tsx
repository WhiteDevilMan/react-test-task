import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { avatar } from '../assets';
import { fetchCommentsRequest } from '../store/actions/commentsActions';
import { RootState } from '../store/reducers/rootReducer';
import { TCommentState, TPost } from '../types';
import Comment from './Comment';

const Post: FC<TPost> = ({ id, title, body }) => {
  const dispatch = useDispatch();
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(false);
  const { pending, comments, error } = useSelector(
    (state: RootState) => state.comments,
  ) as TCommentState;

  const toggleComments = () => {
    setIsCommentsVisible((prev) => !prev);
    dispatch(fetchCommentsRequest(id));
  };

  return (
    <article>
      <h2>{title}</h2>
      <img src={avatar} alt="user image" />
      <p>{body}</p>

      <button type="button" onClick={() => toggleComments()}>
        Comments
      </button>

      {isCommentsVisible && (
        <section>
          {pending && <div>Loading...</div>}
          {/* TODO: add modal for error ? */}
          {error && <div>{`error: ${error}`}</div>}

          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              postId={comment.postId}
              name={comment.name}
              email={comment.email}
              body={comment.body}
            />
          ))}
        </section>
      )}
    </article>
  );
};

export default Post;
