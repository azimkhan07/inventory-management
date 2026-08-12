import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    const menus = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "bi-speedometer2"
        },
        {
            name: "Categories",
            path: "/categories",
            icon: "bi-grid"
        },
        {
            name: "Products",
            path: "/products",
            icon: "bi-box-seam"
        }
    ];

    return (
        <div className="sidebar bg-dark text-white" style={{ width: "240px", minHeight: "100vh" }}>
            <div className="p-3 border-bottom border-secondary">
                <h4 className="text-white mb-0">Inventory</h4>
                <small className="text-secondary">Management System</small>
            </div>

            <div className="mt-3">

                {menus.map((menu) => (
                    <Link
                        key={menu.path}
                        to={menu.path}
                        className={`nav-link d-flex align-items-center mb-2 ${location.pathname === menu.path ? "active" : ""}`}
                    >
                        <i className={`bi ${menu.icon} me-2`}></i>
                        {menu.name}
                    </Link>
                ))}

            </div>
        </div>
    );
}

export default Sidebar;
