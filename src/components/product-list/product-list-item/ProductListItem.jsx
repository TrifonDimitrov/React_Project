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
      <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={imageUrl}
          className="w-[500px] h-[130px] object-cover group-hover:opacity-75 "
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">
        {brand} {model}
      </h3>
      <h4 className="mt-1 text-lg text-bold">
        Energy class: {energyEfficiencyRating}
      </h4>
      <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>
      <div className="text-left pr-5">
        <Link
          to={`/products/${_id}`}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          See more
        </Link>
      </div>
    </div>
  );
}
