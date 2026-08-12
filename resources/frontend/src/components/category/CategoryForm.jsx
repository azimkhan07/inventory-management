import { useEffect, useState } from "react";
import api from "../../api/axios";

function CategoryForm({ getCategories, editData, setEditData }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (editData) {
            setId(editData.id);
            setName(editData.name);
            setDescription(editData.description ?? "");
        }
    }, [editData]);

    const saveCategory = async (e) => {
        e.preventDefault();

        try {
            if (id === "") {
                await api.post("/categories", {
                    name: name,
                    description: description,
                });
            } else {
                await api.put("/categories/" + id, {
                    name: name,
                    description: description,
                });
            }

            setId("");
            setName("");
            setDescription("");
            setEditData(null);

            document.getElementById("closeCategoryModal").click();

            getCategories();

            alert("Category Saved Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="modal fade" id="categoryModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>{id ? "Edit Category" : "Add Category"}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                    </div>
                    <form onSubmit={saveCategory}>
                        <div className="modal-body">
                            <div className="row align-items-center mb-2">
                                <label className="col-md-3 col-form-label"> Name </label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control form-control-sm" value={name} onChange={(e) => setName(e.target.value) } required />
                                </div>
                            </div>

                            <div className="row align-items-start mb-2">
                                <label className="col-md-3 col-form-label">  Description </label>

                                <div className="col-md-9">
                                    <textarea className="form-control form-control-sm" rows="3" value={description} onChange={(e) => setDescription(e.target.value) } ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer py-2">
                            <button type="button" className="btn btn-secondary btn-sm" id="closeCategoryModal" data-bs-dismiss="modal"> Close </button>
                            <button type="submit" className="btn btn-primary btn-sm" >  {id ? "Update" : "Save"} </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CategoryForm;
