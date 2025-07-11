import "./category.css";
import { useParams, Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

const Category = () => {
  const { category } = useParams();

  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPostsBasedOnCategory(category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <section className="category">
      {postsCate.length === 0 ? (
        <>
          <h1 className="category-not-found">
            Posts with <span>{category}</span> category not found
          </h1>
          <Link to="/posts" className="category-not-found-link">
            Go to Posts page
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </section>
  );
};

export default Category;
