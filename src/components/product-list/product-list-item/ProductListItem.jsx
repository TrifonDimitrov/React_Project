import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import * as productApi from "../../../api/products-api";
import { AuthContext } from "../../../contexts/authContext";

export default function ProductListItem({
  _id,
  brand,
  model,
  energyEfficiencyRating,
  price,
  imageUrl,
  likes = [],
}) {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [hasLiked, setHasLiked] = useState(likes.includes(userId));

  const hendleLike = async () => {
    try {
      const updateProduct = await productApi.toggleLike(_id);
      setLikesCount(updateProduct.likes.length);
      setHasLiked(updateProduct.likes.includes(userId));
    } catch (error) {
      console.error("Failed to like product:", error);
    }
  };

  const hendlAlert = () => {
    return alert("Please login to like products!");
  };

  return (
    <div className="group">
      <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={imageUrl}
          className="w-[500px] h-[130px] object-cover group-hover:opacity-75 "
        />
      </div>
      <h4 className="mt-4 text-m text-bold">
        {brand} {model}
      </h4>

      <h3 className="mt-1 text-m text-green-600">
        Energy class: {energyEfficiencyRating}
      </h3>
      <p className="mt-1 text-m text-bold">Цена: {price}</p>
      <div className="flex items-end justify-between mt-5">
        <Link
          to={`/products/${_id}`}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          See more
        </Link>
        {isAuthenticated ? (
          <>
            <button onClick={hendleLike} className="text-red-500 font-medium">
              {hasLiked ? "❤️ Liked" : "🤍 Like"} ({likesCount})
            </button>
          </>
        ) : (
          <>
            <button onClick={hendlAlert} className="text-red-500 font-medium">
              🤍 Like ({likesCount})
            </button>
          </>
        )}
      </div>
    </div>
  );
}
