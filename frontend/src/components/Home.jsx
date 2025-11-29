import logo from "../assets/Northwestern-Wildcats-Logo-1981.png";


export default function Home() {
  return (
    <main className="home-main d-flex align-items-center justify-content-center" style={{backgroundColor: "#836EAA", width: "100vw", height: "100vh"}}>
      <div className="col-md-6">
        <h1 className="fw-bold">Connect with Friends in Northwestern!</h1>
        <p className="text-muted">
          Discover posts, find new friends, and join groups you love.
        </p>
        <button className="btn btn-primary btn-lg mt-3">Get Started</button>
      </div>

      <div className="col-md-6">
        <img src={logo} className="img-fluid" alt="logo" />
      </div>
    </main>
);
}