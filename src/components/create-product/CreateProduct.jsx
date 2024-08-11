import { useForm } from "../../hooks/useForm";
import { useCreateProduct } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";

const initialValues = {
  brand: "",
  model: "",
  coolingCapacity: "",
  heatingCapacity: "",
  energyEfficiencyRating: "",
  price: "",
  description: "",
  imageUrl: "",
};

export default function CreateProduct() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();

  const createHendler = async (value) => {
    try {
      await createProduct(value);
      console.log(value);

      navigate("/products");
    } catch (error) {
      console.log("Error from Create product", error.message);
    }
  };

  const { value, changeHandler, submitHandler } = useForm(
    initialValues,
    createHendler
  );

  return (
    <div className="container mt-20">
      <div className="max-w-md mx-auto">
        <form
          onSubmit={(e) => {
            submitHandler(e);
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
              value={value.brand}
              onChange={changeHandler}
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
              value={value.model}
              onChange={changeHandler}
              className="w-full px-3 py-1 border rounded"
              required
            />
          </div>

          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="coolingCapacity"
            >
              Cooling Capacity kW:
            </label>
            <input
              id="coolingCapacity"
              name="coolingCapacity"
              type="text"
              value={value.coolingCapacity}
              onChange={changeHandler}
              className="w-full px-3 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="heatingCapacity"
            >
              Heating Capacity kW:
            </label>
            <input
              id="heatingCapacity"
              name="heatingCapacity"
              type="text"
              value={value.heatingCapacity}
              onChange={changeHandler}
              className="w-full px-3 py-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="energyEfficiencyRating"
            >
              Energy Efficiency Rating A/A+++
            </label>
            <input
              id="energyEfficiencyRating"
              name="energyEfficiencyRating"
              type="text"
              value={value.energyEfficiencyRating}
              onChange={changeHandler}
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
              value={value.price}
              onChange={changeHandler}
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
              value={value.description}
              onChange={changeHandler}
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
              value={value.imageUrl}
              onChange={changeHandler}
              className="w-full px-3 py-1 border rounded"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
