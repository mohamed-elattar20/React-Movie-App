import { Link } from "react-router-dom";
import logo from "../../Assets/Imgs/logo.svg";
import "./Navbar.css";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 shadow sticky-top ">
        <div className="container justify-content-start">
          <button
            className="navbar-toggler border-0 onFocus"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" className="img-fluid w-50" />
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pages
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Movies
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  TV Shows
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Celebs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
