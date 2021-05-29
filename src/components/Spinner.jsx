const Spinner = () => {
  return (
    <div
      className="text-center d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
