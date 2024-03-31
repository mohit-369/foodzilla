import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios

const Admin = () => {

  const [foodlist, setFoodlist] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Use Axios for fetching data
    axios
      .get("http://localhost:8001/api/getAllRes")
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

  const handleResSelection = (index) => {
    const updatedFoodlist = [...foodlist];
    updatedFoodlist[index].selected = !updatedFoodlist[index].selected;
    setFoodlist(updatedFoodlist);
  };

  const handleDeleteRes = async () => {
    try {
      const selectedItems = foodlist.filter((item) => item.selected);
      // Stringify the data and set the Content-Type header
      const requestData = JSON.stringify(selectedItems);
      console.log("Data for backend :", requestData);
      // Use Axios for the POST request with proper headers
      const response = await axios.post(
        "http://localhost:8001/api/deletRes",
        requestData,
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
  const handelSubmit = async () => {
    try {
      axios.post(
        "http://localhost:8001/api/addRes",
        {
          name,
          owner,
          phone,
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
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.owner}</td>
              <td>{item.phone}</td>
              <td>
                <button onClick={() => handleResSelection(index)}>
                  {foodlist[index].selected ? "Unselect" : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <button onClick={handleDeleteRes}>Delete Res</button>
        <br></br>
      </table>
      <form onSubmit={handelSubmit}>
        <input
          type="name"
          placeholder="Restaurent Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <input
          type="name"
          placeholder="Owner Name"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <br></br>
        <input
          type="phone"
          placeholder="phone no"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br></br>
        <button type="submit">add Res</button>
      </form>
    </div>
  );
};

export default Admin;
