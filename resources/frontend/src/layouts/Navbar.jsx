import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-4" style={{ minHeight: "60px" }} >
            <div className="container-fluid">
                <h5 className="mb-0 fw-bold text-dark"> Inventory System </h5>
                <div className="d-flex align-items-center">
                    <span className="me-3 text-secondary fw-semibold small"> Welcome, <span className="text-dark ms-1">{user?.name}</span> </span>
                    <button className="btn btn-danger btn-sm px-3" onClick={logout} > Logout </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
