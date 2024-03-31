"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UpdateMachine from "../updateMachine/[id]/page";
import mongoose from "mongoose";

const MachineForm = () => {
  const defaultFormData = {
    machine_name: "",
    description: "",
    available_quantity: "",
    total_quantity: "",
  };
  const router = useRouter();
  const [formData, setFormData] = useState(defaultFormData);
  const [hasParent, setHasParent] = useState(false);
  let [machines, setMachines] = useState([]);
  let [parentMachine, setParentMachine] = useState(null);
  let [selectedMachineId, setSelectedMachineId] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    if (type === "checkbox") {
      setHasParent(e.target.checked);
    } else
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  };

  useEffect(() => {
    const names = [];
    const getMachine = async () => {
      const response = await fetch("/api/machine", {
        method: "GET",
      });

      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        names.push({ name: data[i].machine_name, id: data[i]._id });
      }
      machines = names;
      setMachines(machines);
    };
    getMachine();
  }, []);

  useEffect(() => {
    console.log("affected");
    if (parentMachine) {
      updateMachine();
    }
  }, [parentMachine]);

  const handleMachineChange = async (e) => {
    const id = e.target.value;
    setSelectedMachineId(id);
    console.log(selectedMachineId);
  };

  const updateMachine = async () => {
    console.log(parentMachine);
    console.log(parentMachine._id);
    const res = await fetch(
      `http://localhost:3000/api/machine/${parentMachine._id}`,
      {
        method: "PUT",
        body: JSON.stringify({ formData: parentMachine }),
        //@ts-ignore
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to update machine.");
    }
    router.refresh();
    router.push("/showMachine");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/machine", {
      method: "POST",
      body: JSON.stringify({ formData }),
      //@ts-ignore
      "Content-Type": "application/json",
    });
    if (res.ok) {
      console.log("machine created");
      const created_machine = await res.json();
      if (selectedMachineId) {
        console.log(selectedMachineId);
        const response = await fetch(`api/machine/${selectedMachineId}`);
        let result = await response.json();
        console.log(result);
        result = result.foundMachine;
        result.subparts.push({
          machine_id: new mongoose.Types.ObjectId(created_machine.id),
        });
        console.log(result);
        setParentMachine(result);
        // setParentMachine(async (prevMachine) => {
        //   const response = await fetch(`api/machine/${selectedMachineId}`);
        //   let result = await response.json();
        //   console.log(result);
        //   result = result.foundMachine;
        //   result.subparts.push({ machine_id: created_machine.id });
        //   console.log(result);
        //   return result;
        // });
      }
    } else {
      throw new Error("Failed to create machine");
    }
    router.refresh();
    router.push("/showMachine");
  };

  return (
    <div className="bg-orange-50 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-8 shadow-lg  rounded-lg overflow-hidden"
      >
        <div className="bg-white px-8 py-6">
          <div className="mb-4">
            <label
              htmlFor="machine_name"
              className="block text-gray-700 font-bold mb-2"
            >
              Machine Name:
            </label>
            <input
              type="text"
              name="machine_name"
              value={formData.machine_name}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-gray-400 rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-gray-400 rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="total_quantity"
              className="block text-gray-700 font-bold mb-2"
            >
              Total Quantity:
            </label>
            <input
              type="number"
              name="total_quantity"
              value={formData.total_quantity}
              onChange={handleChange}
              min={0}
              required
              className="shadow appearance-none border border-gray-400 rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="available_quantity"
              className="block text-gray-700 font-bold mb-2"
            >
              Available Quantity:
            </label>
            <input
              type="number"
              name="available_quantity"
              value={formData.available_quantity}
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
                checked={hasParent}
                onChange={handleChange}
                className="mr-2 leading-tight"
              />
              <span>Has Parent?</span>
            </label>
            {hasParent && (
              <div className="mt-2">
                <label>Select Parent</label>
                <select
                  value={selectedMachineId || ""}
                  onChange={handleMachineChange}
                >
                  <option value="">Select Machine</option>
                  {machines.map((machine) => (
                    <option key={machine.id} value={machine.id}>
                      {machine.name}
                    </option>
                  ))}
                </select>
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
