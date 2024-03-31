import { useState, useEffect } from "react";
import axios from "axios";
const OrderStatus = () => {
  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    // Use Axios for fetching data
    Orders();
  }, []);
  const Orders = async () => {
    axios
      .get("http://localhost:8001/api/ResOrder")
      .then((response) => {
        setData(response.data);
        const initializedFoodlist = response.data.map((item) => ({
          dishName: item.dishName,
          quantity: item.quantity,
          price: item.dishPrice * item.quantity,
          ph: item.ph,
        }));
        setFoodlist(initializedFoodlist);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  const handleDishAccept = (index) => {
    const updatedFoodlist = [...foodlist];
    updatedFoodlist[index].accept = !updatedFoodlist[index].accept;
    setFoodlist(updatedFoodlist);
  };
  const handleOrder = async () => {
    try {
      const requestData = JSON.stringify(foodlist);
      const data = await axios.post(
        "http://localhost:8001/api/updateOrder",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("order confirmed", data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <h1>Order list</h1>
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
          {foodlist.map((item, index) => (
            <tr key={item.id}>
              <td>{item.dishName}</td>
              <td>{item.price}</td>
              <td>{item.ph}</td>
              <td>
                <button onClick={() => handleDishAccept(index)}>
                  {foodlist[index].accept ? "Reject" : "accept"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <button onClick={() => handleOrder()}>Order confirm</button>
      </table>
    </div>
  );
};

export default OrderStatus;
