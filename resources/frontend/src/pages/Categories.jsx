import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import CategoryForm from "../components/category/CategoryForm";
import api from "../api/axios";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [editData, setEditData] = useState(null);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});

    const getCategories = async () => {
        try {
            const response = await api.get(`/categories?page=${page}`);
            console.log(response.data);
            setCategories(response.data.data);
            setPagination(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, [page]);

    const editCategory = (category) => {
        setEditData(category);
    };

    const deleteCategory = async (id) => {
        if (!window.confirm("Delete this category?")) {
            return;
        }

        try {
            await api.delete("/categories/" + id);
            getCategories();
            alert("Category Deleted Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DashboardLayout>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Categories</h3>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#categoryModal">Add Category</button>
            </div>

            <table className="table table-bordered table-hover bg-white">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th width="150">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" data-bs-toggle="modal" data-bs-target="#categoryModal" onClick={() => editCategory(category)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteCategory(category.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No Categories Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(page - 1)} > Previous  </button>
                <span> Page {pagination.current_page} of {pagination.last_page} </span>
                <button className="btn btn-secondary" disabled={page === pagination.last_page}  onClick={() => setPage(page + 1)} >  Next  </button>
            </div>
            <CategoryForm getCategories={getCategories} editData={editData} setEditData={setEditData} />
        </DashboardLayout>
    );
}

export default Categories;
