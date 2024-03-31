import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import OrderStatus from "./OrderStatus";

const ResOwner = () => {
  const { phone } = useParams();
  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [resid, setResid] = useState();
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
      // Stringify the data and set the Content-Type header
      // const requestData = JSON.stringify(foodlist);
      console.log("Data from backend :", foodlist);
      // Use Axios for the POST request with proper headers
      const response = await axios.post(
        "http://localhost:8001/api/deletedishes",
        foodlist
      );

      console.log("response :", response);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  const handelSubmit = async () => {
    try {
      axios.post(
        "http://localhost:8001/api/adddish",
        {
          dishName: name,
          dishPrice: price,
          ph: resid,
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <input
          type="number"
          placeholder="Dish Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br></br>
        <input
          type="Restaurent id"
          placeholder="resid"
          value={resid}
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
