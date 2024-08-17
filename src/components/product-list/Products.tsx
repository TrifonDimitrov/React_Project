import React, { useEffect, useState } from "react";
import * as productsApi from "../../api/products-api";
import ProductListItem from "./product-list-item/ProductListItem";

interface Product {
  _id: string,
  brand: string,
  model: string,
  coolingCapacity: string,
  heatingCapacity: string,
  energyEfficiencyRating: string,
  price: string,
  description: string,
  imageUrl: string
}

export default function productList() {
  const [products, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    productsApi.getAll().then(result => setProduct(result));
  }, []);
  
  return (
    <div className="bg-white">
    <div className="mx-auto mt-5 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map(product => (
          <ProductListItem key={product._id} {...product} />
        ))}
      </div>
    </div>
  </div>
);
}
//     <div className="bg-white">
//       <div className="mx-auto mt-5 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//       <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//         {products.map(product => <ProductListItem key={product._id}{...product}/>)}
//       </div>
//     </div>
//     </div>
//   );
// }
