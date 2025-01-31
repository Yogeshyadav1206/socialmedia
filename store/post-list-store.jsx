import { createContext, useReducer, useState, useEffect } from "react";
export const PostList = createContext({
  postlist: [],
  fetching: false,
  addpost: () => {},
  deletepost: () => {},
});
const PostListReducer = (currentpostlist, action) => {
  let newpostlist = currentpostlist;
  if (action.type === "DELETE_POST") {
    newpostlist = currentpostlist.filter(
      (post) => post.id !== action.payload.id
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newpostlist = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newpostlist = [action.payload, ...currentpostlist];
  }
  return newpostlist;
};
const DEFAULT_POST = [];
const PostListProvider = ({ children }) => {
  const [postlist, dispatchPostList] = useReducer(
    PostListReducer,
    DEFAULT_POST
  );
  const [fetching, setFetching] = useState(false);
  const addpost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };
  const addinitialposts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };
  const deletepost = (postId) => {
    dispatchPostList({ type: "DELETE_POST", payload: { id: postId } });
    // console.log(`delete for ${postId}`);
  };
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addinitialposts(data.posts);
        setFetching(false);
      });
    return () => {
      console.log("cleaning up");
      controller.abort();
    };
  }, []);
  return (
    <PostList.Provider value={{ postlist, addpost, deletepost, fetching }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
