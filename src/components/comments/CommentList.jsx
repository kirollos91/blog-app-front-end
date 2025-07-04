import { useState } from "react";
import "./comment-list.css";
import Swal from "sweetalert2";
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // Delete Comment Handler
  const deleteCommentHandler = async (commentId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed)
      return; /*Swal.fire({ titleText: "Something went wrong!", icon: "warning" });*/

    dispatch(deleteComment(commentId));

    Swal.fire({
      title: "Deleted!",
      text: "Your Comment has been deleted.",
      icon: "success",
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">{comment?.username}</div>
            <div className="comment-item-time">
              {Moment(comment?.createdAt).fromNow()}
            </div>
          </div>

          <p className="comment-item-text">{comment?.text}</p>

          {comment?.user === user?._id && (
            <div className="comment-item-icon-wrapper">
              <i
                className="bi bi-pencil-square"
                onClick={() => updateCommentHandler(comment)}
              ></i>
              <i
                className="bi bi-trash-fill"
                onClick={() => deleteCommentHandler(comment?._id)}
              ></i>
            </div>
          )}
        </div>
      ))}

      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
