import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as productApi from "../../api/products-api";

export default function EditProduct() {
  const [product, setProduct] = useState({});
  const { modelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (modelId) {
      productApi
        .getOne(modelId)
        .then((product) => setProduct(product))
        .catch((error) => console.error("Filed to fetch product:", error));
    }
  }, [modelId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      await productApi.editProduct(modelId, product);
      navigate(`/products/${modelId}`);
    } catch (error) {
      console.log("Failed to edit product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-20">
      <div className="max-w-md mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault(), handleEdit();
          }}
        >
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="brand"
            >
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={product.brand}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="model"
            >
              Model
            </label>
            <input
              id="model"
              name="model"
              type="text"
              value={product.model}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="coolingCapacity"
            >
              Cooling Capacity
            </label>
            <input
              id="coolingCapacity"
              name="coolingCapacity"
              type="text"
              value={product.coolingCapacity}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="heatingCapacity"
            >
              Heating Capacity
            </label>
            <input
              id="heatingCapacity"
              name="heatingCapacity"
              type="text"
              value={product.heatingCapacity}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="energyEfficiencyRating"
            >
              Energy Efficiency Rating
            </label>
            <input
              id="energyEfficiencyRating"
              name="energyEfficiencyRating"
              type="text"
              value={product.energyEfficiencyRating}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="text"
              value={product.price}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imageUrl"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              value={product.imageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
