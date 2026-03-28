import { useEffect, useState } from "react";
import API from "../services/api";

function UserPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to load products"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>User Product View</h1>
        <p>Browse available products and view their details.</p>
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-card-img"
              />
              <div className="product-card-body">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {product.created_at
                    ? new Date(product.created_at).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default UserPage;