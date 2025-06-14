const Loading = () => {
  return (
    <div className="d-flex justify-content-center ">
      <div
        className="spinner-border"
        role="status"
        style={{ margin: "40px", width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Loading;
