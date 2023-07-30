import HomePage from "./components/HomePage";

const Home = () => {
  return (
    <div
      style={{
        background: "red",
        height: "100vh",
        margin: "auto",
        width: "70%",
        paddingTop: "50px",
      }}
    >
      <div style={{ padding: "30px 30px 0 30px" }}>
        <h1>How to show the hidden page number?</h1>
      </div>
      <div style={{ padding: "60px 30px" }}>
        <HomePage />
      </div>
    </div>
  );
};

export default Home;
