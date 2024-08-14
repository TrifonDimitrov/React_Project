import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";

import * as authApi from "../../api/auth-api";


export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
    authApi.getProfileInfo() 
      .then(data => {
        console.log(data);
        
        setUserData(data || {products:[]});
        setLoading(false);
        
      })
      .catch(error => {
        console.error("Failed fetching user data:", error);
        setLoading(false);
        
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!userData) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Profile of {userData?.userName || "Unknown User"}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <p>
          <strong>Name:</strong> {userData.userName}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Your Products</h2>
        {userData.products && userData.products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userData.products.map((product) => (
              <ProductItem key={product._id} {...product} />
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
