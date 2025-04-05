import { useState, useContext, useEffect } from "react";
import ProductListItem from "../product-list/product-list-item/ProductListItem";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

import * as authApi from "../../api/auth-api";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ userName: "", email: "" });
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const fetchUserData = () => {
    authApi
      .getProfileInfo()
      .then((data) => {
        setUserData(data || { products: [] });
        setFormData({ userName: data.userName, email: data.email });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed fetching user data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    authApi
      .updateUserInfo(formData)
      .then((updatedUser) => {
        setUserData(updatedUser);
        fetchUserData();
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Failed updating user data:", error);
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      authApi
        .deleteUser()
        .then(() => {
          localStorage.removeItem("token");
          logout();
          navigate("/register");
        })
        .catch((error) => {
          console.error("Failed to delete user:", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error loading profile</div>;
  }

  return (
    <>
      {" "}
      <div className="w-[300px] h-[230px] text-left m-4 pl-2">
        <h1 className="text-3xl font-bold mb-2">
          Profile of {userData?.userName || "Unknown User"}
        </h1>
        <h2 className="text-xl font-semibold mb-2">User Information:</h2>
        <div className="bg-white   ">
          {isEditing ? (
            <div>
              <label>
                <strong>Name:</strong>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="border rounded p-2 ml-1 mb-1"
                />
              </label>
              <label>
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border rounded p-2 ml-2 mb-2 "
                />
              </label>

              <button
                onClick={handleSave}
                className=" text-white bg-blue-500 hover:bg-blue-700 rounded p-3 ml-20 w-[100px]"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="text-left ">
              <p>
                <strong>Name:</strong> {userData.userName}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <div className="flex-1 ">
                <button
                  onClick={handleEdit}
                  className=" text-white bg-blue-500 hover:bg-blue-700 rounded h-17 w-35 pl-12 pr-12  p-1.5 mr-2  "
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-white bg-red-500 hover:bg-red-700 rounded p-1.5 mt-4"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" border-t-2 border-sky-300 bg-white p-6  m-4  ">
        <h2 className="text-xl font-semibold mb-4">My Products</h2>
        {userData.climates && userData.climates.length > 0 ? (
          <div className=" bg-red grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userData.climates.map((product) => (
              <ProductListItem key={product._id} {...product} />
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
}
