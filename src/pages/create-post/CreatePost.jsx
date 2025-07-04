import { useState, useEffect } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { BeatLoader } from "react-spinners";

const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });

  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  const formChangeHandle = (event) => {
    setForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    // Validation Input
    if (form.title.trim() === "") return toast.error("Post Title is required");
    if (form.description.trim() === "")
      return toast.error("Post Description is required");
    if (form.category.trim() === "")
      return toast.error("Post Category is required");
    if (!form.file) return toast.error("Post Image is required");

    // Set In FormData
    const formData = new FormData();
    formData.append("image", form.file);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);

    dispatch(createPost(formData));
  };

  const nav = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      nav("/");
    }
  }, [isPostCreated, nav]);

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form className="create-post-form" onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          name="title"
          value={form.title}
          onChange={formChangeHandle}
        />

        <select
          value={form.category}
          className="create-post-input"
          name="category"
          onChange={formChangeHandle}
        >
          <option value="" disabled>
            Select A Category
          </option>
          {categories?.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          row="5"
          className="create-post-textarea"
          placeholder="Post Description"
          value={form.description}
          onChange={formChangeHandle}
        ></textarea>

        <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, file: e.target.files[0] };
            })
          }
        />

        <button type="submit" className="create-post-btn">
          {loading ? <BeatLoader color="white" /> : "Create"}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
