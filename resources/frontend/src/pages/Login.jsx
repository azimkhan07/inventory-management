import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post("/login", form);
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        }
        setLoading(false);
    };

    return (

        <>

            <ToastContainer />

            <div className="container">

                <div className="row justify-content-center mt-5">

                    <div className="col-md-4">

                        <div className="card shadow">

                            <div className="card-header text-center">

                                <h3>Inventory Login</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label>Email</label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={form.email}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Password</label>

                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={form.password}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <button
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >

                                        {loading ? "Please Wait..." : "Login"}

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Login;
