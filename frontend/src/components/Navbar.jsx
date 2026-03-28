import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Product Management System</div>
      <div className="nav-links">
        <Link to="/">User View</Link>
        <Link to="/admin">Admin Panel</Link>
      </div>
    </nav>
  );
}

export default Navbar;