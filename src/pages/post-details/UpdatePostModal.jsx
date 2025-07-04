import "./update-post.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const [form, setForm] = useState({
    title: post.title,
    category: post.category,
    description: post.description,
  });

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  // form data change handle all in one
  const formDataChangeHandle = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Form Handler Submit
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (form.title.trim() === "") return toast.error("Post Title is required");
    if (form.category.trim() === "")
      return toast.error("Post Category is required");
    if (form.description.trim() === "")
      return toast.error("Post Description is required");

    dispatch(updatePost(form, post._id));
    setUpdatePost(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="update-post">
      <form className="update-post-form" onSubmit={formSubmitHandler}>
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-post-form-close"
            onClick={() => setUpdatePost(false)}
          ></i>
        </abbr>

        <h1 className="update-post-title">Update Post</h1>
        <input
          type="text"
          name="title"
          className="update-post-input"
          value={form.title}
          onChange={formDataChangeHandle}
        />

        <select
          className="update-post-input"
          name="category"
          value={form.category}
          onChange={formDataChangeHandle}
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories?.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>

        <textarea
          rows="5"
          className="update-post-textarea"
          name="description"
          value={form.description}
          onChange={formDataChangeHandle}
        ></textarea>

        <button type="submit" className="update-post-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
