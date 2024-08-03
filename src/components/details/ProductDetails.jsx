import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as productsApi from "../../api/products-api";

export default function ProductDetails () {
  const {modelId} = useParams();
  const [product, setProduct] = useState({});

  useEffect (() => {
    if (modelId) {
      productsApi.getOne(modelId).then(product => setProduct(product))
      .catch(err => console.err('Faild to fetch product:', err));
    }else{
      console.log('No id');
    }
   
  },[modelId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{product.brand} {product.model}</h1>
        <img
          src={product.imageUrl}
          alt={product.description}
          className="w-full h-auto mb-4"
        />
        <p className="text-xl mb-2"><strong>Price:</strong> {product.price}</p>
        <p className="text-lg mb-2"><strong>Cooling Capacity:</strong> {product.coolingCapacity}</p>
        <p className="text-lg mb-2"><strong>Heating Capacity:</strong> {product.heatingCapacity}</p>
        <p className="text-lg mb-2"><strong>Energy Efficiency Rating:</strong> {product.energyEfficiencyRating}</p>
        <p className="text-base mb-4">{product.description}</p>
      </div>
    </div>
  );
}