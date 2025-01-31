import { useContext, useEffect, useState } from "react";
import Post from "../../../contextApi2/contapi/src/component/post";
import { PostList as PostListData } from "../store/post-list-store";
import Welcome from "./Welcome";
import Loading from "./Loading";
function Postlist() {
  const { postlist, fetching } = useContext(PostListData);
  return (
    <>
      {fetching && <Loading />}
      {!fetching && postlist.length === 0 && <Welcome />}
      {!fetching && postlist.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
}

export default Postlist;
