"use client"
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
    setSubParts([...subParts, item]);
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
    const res = await fetch("/api/machine", {
      method: "POST",
      body: JSON.stringify(new_Item),
      //@ts-ignore
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Failed to create machine");
    } else console.log("machine created");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      machineName: machineName,
      description: description,
      totalQuantity: totalQuantity,
      availableQuantity: availableQuantity,
      hasSubparts: hasSubparts,
      subParts: subParts,
    };

    sendObject(newItem);
  };

  return (
    <div className="bg-orange-50 min-h-screen flex items-center justify-center">
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 shadow-lg  rounded-lg overflow-hidden">
  <div className="bg-white px-8 py-6">
    <div className="mb-4">
      <label htmlFor="machineName" className="block text-gray-700 font-bold mb-2">Machine Name:</label>
      <input
        type="text"
        name="machineName"
        value={machineName}
        onChange={handleChange}
        required
        className="shadow appearance-none border border-gray-400 rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
      <textarea
        name="description"
        value={description}
        onChange={handleChange}
        required
        className="shadow appearance-none border border-gray-400 rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="totalQuantity" className="block text-gray-700 font-bold mb-2">Total Quantity:</label>
      <input
        type="number"
        name="totalQuantity"
        value={totalQuantity}
        onChange={handleChange}
        min={0}
        required
        className="shadow appearance-none border border-gray-400 rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="availableQuantity" className="block text-gray-700 font-bold mb-2">Available Quantity:</label>
      <input
        type="number"
        name="availableQuantity"
        value={availableQuantity}
        onChange={handleChange}
        min={0}
        required
        className="shadow appearance-none border border-gray-400 rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label className="flex items-center text-gray-700 font-bold">
        <input
          type="checkbox"
          name="hasSubparts"
          checked={hasSubparts}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
        <span>Is Subparts</span>
      </label>
      {hasSubparts && (
        <div className="mt-2">
          {subParts.map((subPart, index) => (
            <p key={index} className="text-gray-700">{index + 1}. {subPart}</p>
          ))}
          <div className="flex items-center mt-2">
            <input
              type="text"
              name="item"
              value={item}
              onChange={handleChange}
              placeholder="Machine Id"
              className="shadow appearance-none border border-gray-400 rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={handleAddItem}
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-r mx-2 hover:bg-blue-600 focus:outline-none"
            >
              Add 
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  <div className="bg-gray-100 px-4 py-3 flex justify-end">
    <button
      type="submit"
      className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 focus:outline-none"
    >
      Submit
    </button>
  </div>
</form>
</div>
  );
};

export default MachineForm;
