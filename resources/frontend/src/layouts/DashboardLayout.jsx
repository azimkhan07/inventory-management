import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function DashboardLayout({ children }) {
    return (
        <div className="d-flex" style={{ minHeight: "60px", width: "100%", overflow: "hidden" }} >
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="d-flex flex-column flex-grow-1" style={{ minHeight: "60px", width: "100%", background: "#f4f6f9" }} >
                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <main className="flex-grow-1 p-4" style={{ overflowY: "auto", }} > {children} </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default DashboardLayout;
