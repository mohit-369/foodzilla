import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import OrderStatus from "./OrderStatus";
import { authService } from "../services/authServices";
const ResOwner = () => {
  const { phone } = useParams();
  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);
  const [dishName, setName] = useState("");
  const [dishPrice, setPrice] = useState();
  const [ph, setResid] = useState();
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
  }, []);

  const handleDishSelection = (index) => {
    const updatedFoodlist = [...foodlist];
    updatedFoodlist[index].selected = !updatedFoodlist[index].selected;
    setFoodlist(updatedFoodlist);
  };

  const handleDeleteDish = async () => {
    try {
      const selectedItems = foodlist.filter((item) => item.selected);
      const token = authService.getToken();
      const data = {
        ...selectedItems,
        token,
      };
      // Stringify the data and set the Content-Type header
      // const requestData = JSON.stringify(foodlist);
      console.log("Data from backend :", data);
      // Use Axios for the POST request with proper headers
      const response = await axios.post(
        "http://localhost:8001/api/deletedishes",
        data
      );

      console.log("response :", response);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = authService.getToken();
      axios.post(
        "http://localhost:8001/api/adddish",
        {
          dishName,
          dishPrice,
          ph,
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
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
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{item.dishName}</td>
              <td>{item.dishPrice}</td>
              <td>{item.ph}</td>
              <td>
                <button onClick={() => handleDishSelection(index)}>
                  {foodlist[index].selected ? "Unselect" : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDeleteDish}>Delete Dishes</button>
      <br></br>
      <br></br>
      <form onSubmit={handelSubmit}>
        <input
          type="name"
          placeholder="Dish Name"
          value={dishName}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <input
          type="number"
          placeholder="Dish Price"
          value={dishPrice}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br></br>
        <input
          type="Restaurent id"
          placeholder="resid"
          value={ph}
          onChange={(e) => setResid(e.target.value)}
        />
        <br></br>
        <button type="submit">add dish</button>
      </form>
      {/* <OrderStatus/> */}
    </div>
  );
};

export default ResOwner;
