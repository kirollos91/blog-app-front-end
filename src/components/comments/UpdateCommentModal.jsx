import { useState } from "react";
import { toast } from "react-toastify";
import "./update-comment.css";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentModal = ({ setUpdateComment, commentForUpdate }) => {
  const [text, setText] = useState(commentForUpdate.text);

  const dispatch = useDispatch();

  // Form Handler Submit
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (text.trim() === "") return toast.error("Please, write something");
    dispatch(updateComment(commentForUpdate?._id, text));
    setUpdateComment(false);
  };
  return (
    <div className="update-comment">
      <form className="update-comment-form" onSubmit={formSubmitHandler}>
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-comment-form-close"
            onClick={() => setUpdateComment(false)}
          ></i>
        </abbr>

        <h1 className="update-comment-title">Edit Comment</h1>
        <input
          type="text"
          className="update-comment-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit" className="update-comment-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;
