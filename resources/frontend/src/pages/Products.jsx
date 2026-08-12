import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductForm from "../components/product/ProductForm";
import api from "../api/axios";

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editData, setEditData] = useState(null);
    const [page,setPage]=useState(1);
    const [search,setSearch]=useState("");
    const [pagination, setPagination] = useState({});

    const getProducts = async () => {
        try {
            const response = await api.get(`/products?search=${search}&page=${page}`);
            setProducts(response.data.data ?? response.data);
            setProducts(response.data.data);
            setPagination(response.data.meta);
        } catch (error) {
            console.log(error);
        }
    };

    const getCategories = async () => {
        try {
            const response = await api.get("/categories");

            console.log("Categories Response:", response.data);

            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else if (Array.isArray(response.data.data)) {
                setCategories(response.data.data);
            } else {
                setCategories([]);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
        getCategories();
    }, [page,search]);

    const editProduct = (product) => {
        setEditData(product);
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) {
            return;
        }

        try {
            await api.delete("/products/" + id);
            getProducts();
            alert("Product Deleted Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DashboardLayout>
            <ProductForm getProducts={getProducts} categories={categories} editData={editData} setEditData={setEditData} />
            <div className="d-flex justify-content-end mb-3">
                <div style={{ width: "300px" }}>
                    <input type="text" className="form-control" placeholder="Search Products..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <table className="table table-bordered table-hover bg-white mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Category</th>
                        <th>Selling Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th width="170">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.product_name}</td>
                                <td>{product.sku}</td>
                                <td>{product.category?.name}</td>
                                <td>{product.selling_price}</td>
                                <td>{product.stock_quantity}</td>
                                <td>{product.status}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => editProduct(product)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No Products Found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>  Previous  </button>
                <span>  Page {pagination.current_page} of {pagination.last_page} </span>
                <button className="btn btn-secondary" disabled={page === pagination.last_page} onClick={() => setPage(page + 1)} > Next </button>
            </div>
        </DashboardLayout>
    );
}

export default Products;
