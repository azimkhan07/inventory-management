import { useEffect, useState } from "react";
import api from "../../api/axios";

function ProductForm({ getProducts, categories, editData, setEditData }) {
    const [id, setId] = useState("");
    const [productName, setProductName] = useState("");
    const [sku, setSku] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [status, setStatus] = useState("1");

    useEffect(() => {
        if (editData) {
            setId(editData.id);
            setProductName(editData.product_name);
            setSku(editData.sku);
            setCategoryId(editData.category_id);
            setPurchasePrice(editData.purchase_price);
            setSellingPrice(editData.selling_price);
            setStockQuantity(editData.stock_quantity);
            setStatus(editData.status);
        } else {
            setId("");
            setProductName("");
            setSku("");
            setCategoryId("");
            setPurchasePrice("");
            setSellingPrice("");
            setStockQuantity("");
            setStatus("1");
        }
    }, [editData]);

    const saveProduct = async (e) => {
        e.preventDefault();

        const data = {
            product_name: productName,
            sku: sku,
            category_id: categoryId,
            purchase_price: purchasePrice,
            selling_price: sellingPrice,
            stock_quantity: stockQuantity,
            status: status,
        };

        try {
            if (id === "") {
                await api.post("/products", data);
            } else {
                await api.put("/products/" + id, data);
            }

            alert("Product Saved Successfully");

            setEditData(null);

            getProducts();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card p-3 mb-3">
            <h5>{id ? "Edit Product" : "Add Product"}</h5>

            <form onSubmit={saveProduct}>
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <div className="row align-items-center">
                            <label className="col-4 col-form-label">
                                Product
                            </label>
                            <div className="col-8">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={productName}
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <div className="row align-items-center">
                            <label className="col-4 col-form-label">SKU</label>
                            <div className="col-8">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <div className="row align-items-center">
                            <label className="col-4 col-form-label">
                                Category
                            </label>
                            <div className="col-8">
                                <select
                                    className="form-select form-select-sm"
                                    value={categoryId}
                                    onChange={(e) =>
                                        setCategoryId(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <div className="row align-items-center">
                            <label className="col-4 col-form-label">
                                Purchase
                            </label>
                            <div className="col-8">
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={purchasePrice}
                                    onChange={(e) =>
                                        setPurchasePrice(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <div className="row align-items-center">
                            <label className="col-4 col-form-label">
                                Selling
                            </label>
                            <div className="col-8">
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={sellingPrice}
                                    onChange={(e) =>
                                        setSellingPrice(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <div className="row align-items-center">
                            <label className="col-4 col-form-label">
                                Stock
                            </label>
                            <div className="col-8">
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={stockQuantity}
                                    onChange={(e) =>
                                        setStockQuantity(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <div className="row align-items-center">
                            <label className="col-4 col-form-label">
                                Status
                            </label>
                            <div className="col-8">
                                <select
                                    className="form-select form-select-sm"
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(Number(e.target.value))
                                    }
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-3">
                    <button className="btn btn-sm btn-primary px-4">
                        {id ? "Update Product" : "Save Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
