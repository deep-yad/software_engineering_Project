"use client";
import React, { useState } from "react";
import axios from "axios";

const MachineForm = () => {
  const [machineName, setMachineName] = useState("");
  const [description, setDescription] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [hasSubparts, setHasSubparts] = useState(false);
  const [subParts, setSubParts] = useState([]);
  const [item, setItem] = useState("");

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      setHasSubparts(event.target.checked);
    } else {
      switch (name) {
        case "machineName":
          setMachineName(value);
          break;
        case "description":
          setDescription(value);
          break;
        case "totalQuantity":
          setTotalQuantity(parseInt(value));
          break;
        case "availableQuantity":
          setAvailableQuantity(parseInt(value));
          break;
        case "item":
          setItem(value);
          break;
        default:
          break;
      }
    }
  };

  const handleAddItem = () => {
    setSubParts([...subParts, item]); // Add an empty string for new input
    setItem("");
  };
  const sendObject = async (new_Item) => {
    // try {
    //     const response = await axios.post("/api/create/newMachine",  JSON.stringify({new_Item});
    // //   const response = await axios.post("/api/create/newMachine",  JSON.stringify({new_Item});
    //   if (!response.data.success) {
    //     throw new Error(response.data.message); // Handle errors from backend
    //   }

    //   console.log("Object sent successfully!");
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    const res = await fetch("/api/create/newMachine", {
        method: "POST",
        body: JSON.stringify(new_Item ),
        //@ts-ignore
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create machine");
      }
      else console.log("machine created");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const new_Item = {
      machineName: machineName,
      description: description,
      totalQuantity: totalQuantity,
      availableQuantity: availableQuantity,
      hasSubparts: hasSubparts,
      subParts: subParts,
    };
    console.log(new_Item);
    sendObject(new_Item);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="machineName">Machine Name:</label>
        <input
          type="text"
          name="machineName"
          value={machineName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="availableQuantity">Total Quantity:</label>
        <input
          type="number"
          name="totalQuantity"
          value={totalQuantity}
          onChange={handleChange}
          min={0}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="availableQuantity">Available Quantity:</label>
        <input
          type="number"
          name="availableQuantity"
          value={availableQuantity}
          onChange={handleChange}
          min={0}
          required
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="hasSubparts"
            checked={hasSubparts}
            onChange={handleChange}
          />
          Has Subparts
        </label>
        {hasSubparts && (
          <div>
            {subParts.map((subPart, index) => (
              <p>
                {index + 1}. {subPart}
              </p>
            ))}
            <div className="subpart-item">
              <input
                type="text"
                name="item"
                value={item}
                onChange={handleChange}
                placeholder={`Subpart Name`}
              />
              <button onClick={handleAddItem} type="button">
                Add Item
              </button>
            </div>
          </div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MachineForm;
