import Header from "../components/header";
import { AiFillDelete } from "react-icons/ai";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Postlist from "../components/Postlist";
import Createpost from "../components/createpost";
import PostListProvider from "../store/post-list-store";
import { useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
function App() {
  const [selectedTab, setSelectedTab] = useState("Home");
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedTab("Home");
        break;
      case "/create-post":
        setSelectedTab("Create Post");
        break;
      default:
        selectedTab("Home");
    }
  }, [location.pathname]);
  return (
    <PostListProvider>
      <div className="align">
        <Sidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        ></Sidebar>
        <div className="content">
          <Header></Header>
          <Outlet context={{ setSelectedTab }} />
          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
