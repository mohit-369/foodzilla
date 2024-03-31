import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/api/getAllRes")
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error("Error fetching restaurant data:", error));
  }, []);

  const handleRestaurantClick = (phone) => {
    window.location.href = `/Foodlist/${phone}`;
  };

  return (
    <div>
      <h1>Restaurant List</h1>
      <table>
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Owner Name</th>
            <th>Phone No</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr
              key={restaurant.id}
              onClick={() => handleRestaurantClick(restaurant.phone)}
            >
              <td>{restaurant.name}</td>
              <td>{restaurant.owner}</td>
              <td>{restaurant.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
