import { Link } from "react-router-dom";

export default function ProductListItem({
  _id,
  brand,
  model,
  coolingCapacity,
  heatingCapacity,
  energyEfficiencyRating,
  price,
  description,
  imageUrl,
}) {
  return (
    <div className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          alt={description}
          src={imageUrl}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{brand}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>
      <div className="text-right pr-5">
      <Link to={`/products/${_id}`} className="text-blue-500 hover:text-blue-700 font-medium">Details</Link>
      </div>
    </div>
  );
}
