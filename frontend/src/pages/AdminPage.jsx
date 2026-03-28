import { useEffect, useState } from "react";
import API from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await API.put(`/${editingProduct.id}`, formData);
        alert("Product updated successfully");
        setEditingProduct(null);
      } else {
        await API.post("/", formData);
        alert("Product added successfully");
      }

      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to delete product"
      );
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admin Panel</h1>
        <p>Manage products with add, edit, and delete operations.</p>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        onCancel={handleCancel}
      />

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AdminPage;