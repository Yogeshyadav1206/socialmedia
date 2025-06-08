import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostList } from "../store/post-list-store"; 
function Post({ post }) {
  const { deletepost } = useContext(PostList);
  return (
    <div class="card post-card " style={{ width: "30rem" }}>
      <div class="card-body">
        <h5 class="card-title">
          {post.title}
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => {
              deletepost(post.id);
            }}
          >
            <AiFillDelete />
          </span>
        </h5>
        <p class="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} class="badge text-bg-primary hashtag ">
            {tag}
          </span>
        ))}
        <div className="alert alert-info reactions" role="alert">
           {/* {console.log(post.reaction)} */}
          Reaction are {post.reaction}
        </div>
      </div>
    </div>
  );
}
export default Post;
