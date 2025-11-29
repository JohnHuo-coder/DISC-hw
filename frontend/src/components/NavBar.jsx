import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { user, loading, refreshAuth } = useAuth();
  const navigate = useNavigate();

  return (

    <nav className="navbar fixed-top navbar-expand-lg" style={{backgroundColor: "#B6ACD1"}} data-bs-theme="light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to='/' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink to='/discover' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Discover</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/posts' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Posts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/friends' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Friends</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/groups' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Groups</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/myprofile' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>My Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/settings' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Settings</NavLink>
            </li>
            {!loading&&!user ? 
              <li className="nav-item">
                <button className="btn ms-3" style={{backgroundColor: "#7D5BA6", color: "white"}} onClick={() => navigate("/login")}>Log In</button>
              </li> : null}
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
