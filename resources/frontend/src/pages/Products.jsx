import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductForm from "../components/product/ProductForm";
import api from "../api/axios";

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editData, setEditData] = useState(null);

    const getProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data.data ?? response.data);
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
    }, []);

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
        </DashboardLayout>
    );
}

export default Products;
