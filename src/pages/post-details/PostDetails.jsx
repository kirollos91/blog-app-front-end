import "./post-details.css";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdatePostModal from "./UpdatePostModal";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
  deletePost,
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, id));
  };

  // Delete Post Handler
  const deletePostHandler = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return; //Swal.fire({ titleText: "Something went wrong!", icon: "warning" });

    dispatch(deletePost(post?._id));

    Swal.fire({
      title: "Deleted!",
      text: "Your post has been deleted.",
      icon: "success",
    });
    nav(`/profile/${user?._id}`);
  };

  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt={post?.title}
          className="post-details-image"
        />

        {user?._id === post?.user?._id && (
          <form
            className="update-post-image-form"
            onSubmit={updateImageSubmitHandler}
          >
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>
              Select new image
            </label>
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Upload</button>
          </form>
        )}
      </div>

      <h1 className="post-details-title">{post?.title}</h1>

      <div className="post-details-user-info">
        <img
          src={post?.user.profilePhoto.url}
          alt={post?.user.username}
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>

      <p className="post-details-description">{post?.description}</p>

      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
              onClick={() => dispatch(toggleLikePost(post?._id))}
            ></i>
          )}
          <small>{post?.likes.length} likes</small>
        </div>
        {user?._id === post?.user?._id && (
          <div>
            <i
              className="bi bi-pencil-square"
              onClick={() => setUpdatePost(true)}
            ></i>
            <i className="bi bi-trash-fill" onClick={deletePostHandler}></i>
          </div>
        )}
      </div>

      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="post-details-info-write">
          to write a comment you should login first
        </p>
      )}

      <CommentList comments={post?.comments || []} />
      {updatePost && (
        <UpdatePostModal setUpdatePost={setUpdatePost} post={post || {}} />
      )}
    </section>
  );
};

export default PostDetails;
