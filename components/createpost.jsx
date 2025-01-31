import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate, useOutletContext } from "react-router-dom";
function Createpost() {
  const navigate = useNavigate();
  const { addpost } = useContext(PostList);
  const { setSelectedTab } = useOutletContext();
  const useridElement = useRef();
  const posttitleElement = useRef();
  const postcontentElement = useRef();
  const reactionElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const UserId = useridElement.current.value.trim();
    const postTitle = posttitleElement.current.value.trim();
    const postContent = postcontentElement.current.value.trim();
    const reaction = reactionElement.current.value.trim();
    const tagsinput = tagsElement.current.value.trim();

    if (!UserId || !postTitle || !postContent || !reaction || !tagsinput) {
      alert("All fields are required");
      return;
    }
    const tags = tagsinput.split(" ");
    useridElement.current.value = "";
    posttitleElement.current.value = "";
    postcontentElement.current.value = "";
    reactionElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: UserId,
        title: postTitle,
        body: postContent,
        reaction: reaction,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post);
        addpost(post);
        setSelectedTab("Home");
        navigate("/");
      });
  };
  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="user-id" class="form-label">
          User-Id
        </label>
        <input
          type="text"
          ref={useridElement}
          class="form-control"
          id="user-id"
          placeholder="Enter User Id"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="post-title" class="form-label">
          Post-Title
        </label>
        <input
          type="text"
          ref={posttitleElement}
          class="form-control"
          id="title"
          placeholder="Enter The Post Title"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">
          Post-Content
        </label>
        <textarea
          type="text"
          rows={3}
          ref={postcontentElement}
          class="form-control"
          id="body"
          placeholder="Enter The Post Content"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="reactions" class="form-label">
          Reactions
        </label>
        <input
          type="text"
          ref={reactionElement}
          class="form-control"
          id="reactions"
          placeholder="Reaction on your post"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="tags" class="form-label">
          Tags
        </label>
        <input
          type="text"
          ref={tagsElement}
          class="form-control"
          id="tags"
          placeholder="Enter The Hashtags"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" class="btn btn-primary">
        CreatePost
      </button>
    </form>
  );
}
export default Createpost;
