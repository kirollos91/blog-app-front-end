import { Link } from "react-router-dom";
import "./sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { useEffect } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sidebar">
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/posts/categories/${category.title}`}
            className="sidebar-link"
          >
            {category.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
