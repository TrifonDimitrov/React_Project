import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import * as productsApi from "../../api/products-api";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Background from "../../style/Background";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const { modelId } = useParams();
  const { userId, refreshUser, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (modelId) {
      productsApi
        .getOne(modelId)
        .then((product) => {
          setProduct(product);
        })
        .catch((err) => console.error("Failed to fetch product:", err));
    } else {
      console.log("No id");
    }
  }, [modelId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    navigate(`/products/edit/${modelId}`);
  };

  const handleDelete = async () => {
    try {
      await productsApi.deleteProduct(modelId);
      navigate("/products");
    } catch (error) {
      console.log("Failed to delete product:", error);
    }
  };

  const hendleBuy = async () => {
    try {
      await productsApi.buyProduct(modelId);
      refreshUser();
      alert("You add this product in your profile!");
      navigate("/products");
    } catch (error) {
      console.log("Failed to buy product!", error);
    }
  };

  const isOwner = product.owner && product.owner._id === userId;

  return (
    <div className="container mx-auto px-4 py-8 absolute">
      <Background />
      <div className="max-w-md mx-auto">
        <img
          src={product.imageUrl}
          alt={product.model}
          className="w-full h-auto mb-4"
        />
        <h3 className="text-3xl font-bold mb-5">
          {product.brand} {product.model}
        </h3>
        <p className="text-xl mb-2">
          <strong>Price:</strong> {product.price} лв.
        </p>
        <p className="text-lg mb-2">
          <strong>Cooling Capacity:</strong> {product.coolingCapacity} kW
        </p>
        <p className="text-lg mb-2">
          <strong>Heating Capacity:</strong> {product.heatingCapacity} kW
        </p>
        <p className="text-lg mb-2">
          <strong>Energy Efficiency Rating:</strong>{" "}
          {product.energyEfficiencyRating}
        </p>
        <p className="text-base mb-4">{product.description}</p>
        {isOwner ? (
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-10">
            {isAuthenticated ? (
              <button
                onClick={hendleBuy}
                className="bg-blue-500 text-white text-lg p-2 w-48 rounded hover:bg-blue-700"
              >
                Buy
              </button>
            ) : (
              <p className="text-red-500 text-lg">Please log in to purchase</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
