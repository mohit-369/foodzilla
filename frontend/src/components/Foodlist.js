import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import OrderStatus from "./OrderStatus";
import { authService } from "../services/authServices";
const Foodlist = () => {
  const { phone } = useParams();
  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Use Axios for fetching data
    axios
      .get(`http://localhost:8001/api/getAllDishes/${phone}`)
      .then((response) => {
        setData(response.data);
        const initializedFoodlist = response.data.map((item) => ({
          ...item,
          selected: false,
        }));
        setFoodlist(initializedFoodlist);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [phone]);

  const handleQuantityChange = (index, quantity) => {
    const updatedFoodlist = [...foodlist];
    updatedFoodlist[index].quantity = quantity;
    setFoodlist(updatedFoodlist);
  };

  const handleDishSelection = (index) => {
    const updatedFoodlist = [...foodlist];
    updatedFoodlist[index].selected = !updatedFoodlist[index].selected;
    console.log(updatedFoodlist);
    setFoodlist(updatedFoodlist);
  };

  const handlePlaceOrder = async () => {
    try {
      const selectedItems = foodlist.filter((item) => item.selected);
      const token = authService.getToken();
      const data = {
        ...selectedItems,
        token,
      };
      // Stringify the data and set the Content-Type header
     // const requestData = JSON.stringify(selectedItems);
      console.log("Data for backend :", data);
      // Use Axios for the POST request with proper headers
      const response = await axios.post(
        "http://localhost:8001/api/sendOrder",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response :", response);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <h1>Food list</h1>
      <table>
        <thead>
          <tr>
            <th>Dish Name</th>
            <th>Dish Price</th>
            <th>Contact Info</th>
            <th>Quantity</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{item.dishName}</td>
              <td>{item.dishPrice}</td>
              <td>{item.ph}</td>
              <td>
                <input
                  type="number"
                  value={foodlist[index].quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, e.currentTarget.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDishSelection(index)}>
                  {foodlist[index].selected ? "Unselect" : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePlaceOrder}>Place order</button>
      {/* <OrderStatus/> */}
    </div>
  );
};

export default Foodlist;
