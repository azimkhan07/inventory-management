import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";

function Dashboard() {
    const [dashboard, setDashboard] = useState({
        total_products: 0,
        total_stock: 0,
        low_stock: 0,
        inventory_value: 0,
    });

    const getDashboard = async () => {
        try {
            const response = await api.get("/dashboard");
            setDashboard(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDashboard();
    }, []);

    return (
        <DashboardLayout>
            <h2 className="mb-4">Dashboard</h2>

            <div className="row">
                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">Total Products</h6>
                            <h2>{dashboard.total_products}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">Total Stock</h6>
                            <h2>{dashboard.total_stock}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">Low Stock</h6>
                            <h2>{dashboard.low_stock}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">Inventory Value</h6>
                            <h2>₹ {dashboard.inventory_value}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;
