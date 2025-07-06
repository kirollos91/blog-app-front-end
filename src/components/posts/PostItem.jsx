import { Link } from "react-router-dom";

const PostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;

  const profileName = username ? username : post?.user.username;

  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img
          src={post?.image.url}
          alt={post?.title}
          className="post-item-image"
        />
      </div>

      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link to={profileLink} className="post-item-username">
              {profileName}
            </Link>
          </div>

          <div className="post-item-date">
            {new Date(post.createdAt).toDateString()}
          </div>
        </div>

        <div className="post-item-details">
          <h4 className="post-item-title">{post?.title}</h4>
          <Link
            to={`/posts/categories/${post?.category}`}
            className="post-item-category"
          >
            {post?.category}
          </Link>
        </div>

        <p className="post-item-description">{post.description}</p>

        <Link to={`/posts/details/${post?._id}`} className="post-item-link">
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
