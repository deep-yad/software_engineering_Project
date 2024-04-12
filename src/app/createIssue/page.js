"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const router = useRouter();

  const defaultFormData = {
    issue_id: "0",
    machine_id: "0",
    person_id: "0",
    is_returnable: true,
    due_date: new Date().toISOString().split("T")[0],
    order_is_completed: false,
    description: "dj",
  };

  let [formData, setFormData] = useState(defaultFormData);
  let [selectedPerson, setSelectedPerson] = useState(null);
  let [selectedMachine, setSelectedMachine] = useState(null);
  let [machines, setMachines] = useState([]);
  let [issue_id, set_issue_id] = useState(null);
  let [persons, setPersons] = useState([]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const dateObject = new Date(value);
      const dateString = dateObject.toISOString().split("T")[0];
      console.log(dateString);
      setFormData((prevData) => ({
        ...prevData,
        [name]: dateString,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const updatePerson = async (person) => {
    const res = await fetch(`http://localhost:3000/api/Persons/${person._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData: person }),
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(formData.due_date);
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to update person.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Issues", {
      method: "POST",
      body: JSON.stringify({ formData }),

      "Content-Type": "application/json",
    });

    if (res.ok) {
      const issue = await res.json();
      console.log(issue);
      setSelectedPerson((prevPerson) => {
        const updatedPerson = {
          ...prevPerson,
          current: [...prevPerson.current, { issue_id: issue.id }],
        };
        updatePerson(updatedPerson); // This will now be called after state is updated
        toast.success("Issue Created Successfully")
        return updatedPerson;
      });
    } else {
      toast.error("Something went wrong! Try again")
      throw new Error("Failed to create ticket");
    }

    router.refresh();
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

    const getPersons = async () => {
      const response = await fetch("/api/Persons", {
        method: "GET",
      });

      const data = await response.json();
      persons = data;
      setPersons(persons);
    };

    getMachine();
    getPersons();
  }, []);

  const handleMachineChange = (event) => {
    const selectedMachineId = event.target.value;
    const selectedMachineObject = machines.find(
      (machine) => machine.id === selectedMachineId
    );
    console.log(selectedMachineId);
    setFormData({ ...formData, machine_id: selectedMachineId });
    console.log("++_+", formData);
    selectedMachine = selectedMachineObject;
    setSelectedMachine(selectedMachine);
  };

  const handlePersonChange = (event) => {
    const selectedPersonId = event.target.value;
    console.log("++_+", formData);
    const selectedPersonObject = persons.find(
      (person) => person._id === selectedPersonId
    );
    selectedPerson = selectedPersonObject;
    setFormData({ ...formData, person_id: selectedPersonObject._id });
    setSelectedPerson(selectedPerson);
    console.log("++", formData);
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
       <ToastContainer />
      <div className="sm:max-w-xl sm:mx-auto">
        <div className="bg-white shadow-lg sm:rounded-3xl sm:p-8">
          <h2 className="text-3xl text-gray-900 text-center mb-8 font-bold">
            Enter Issue Details
          </h2>
          <form
            className="space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-s font-semibold"
                htmlFor="machine_id"
              >
                Machine ID
              </label>
              <select
                className="w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="machine_id"
                value={selectedMachine?.id || ""}
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
            <div className="mb-4">
              <label className="block text-s font-semibold" htmlFor="person_id">
                Person ID
              </label>
              <select
                className="w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="person_id"
                value={selectedPerson?._id || ""}
                onChange={handlePersonChange}
              >
                <option value="">Select Person</option>
                {persons.map((person) => (
                  <option key={person._id} value={person._id}>
                    {person.email_id}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-s font-semibold"
                htmlFor="is_returnable"
              >
                Is Returnable
              </label>
              <select
                className="w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="is_returnable"
                name="is_returnable"
                value={formData.is_returnable}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-s font-semibold"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-s font-semibold" htmlFor="due_date">
                Due Date
              </label>
              <input
                className="w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="date"
                id="due_date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
              />
            </div> */}
            <div className="text-center">
              <button
                className="w-full py-3 px-6 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Create Issue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
