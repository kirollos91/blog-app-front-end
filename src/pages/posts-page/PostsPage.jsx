import "./posts-page.css";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsCount, fetchPosts } from "../../redux/apiCalls/postApiCall";

const POST_PER_PAGE = 3;

const PostsPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, postsCount } = useSelector((state) => state.post);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPosts(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar />
      </section>

      <Pagination
        pages={pages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default PostsPage;
