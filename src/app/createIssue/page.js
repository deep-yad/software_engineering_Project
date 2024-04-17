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
  let [selectedMachine1, setSelectedMachine1] = useState(null);
  let [machines, setMachines] = useState([]);
  let [machinesNew, setMachinesNew] = useState([]);
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
  const updateMachine = async (machine) => {
    const res = await fetch(`http://localhost:3000/api/machine/${machine._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData: machine }),
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
        
        return updatedPerson;
      });
      setSelectedMachine1((prevMachine) => {
        const updatedMachine = {
          ...prevMachine,
          available_quantity:prevMachine.available_quantity-1,
        };
        updateMachine(updatedMachine); // This will now be called after state is updated
       // toast.success("Issue Created Successfully")
        return updatedMachine;
        toast.success("Issue Created Successfully")
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
      setMachinesNew(data);
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
    const selectedMachineObject1 = machinesNew.find(
      (machine) => machine._id === selectedMachineId
    );
    console.log(selectedMachineId);
    setFormData({ ...formData, machine_id: selectedMachineId });
    console.log("++_+", formData);
    selectedMachine = selectedMachineObject;
    setSelectedMachine1(selectedMachineObject1);
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
       {/* <ToastContainer /> */}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-2xl sm:p-20">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-gray-900 text-center mb-8 font-bold">Enter Issue Details</h2>
          </div>
          <form
            className="form space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label
                className="text-s font-semibold px-1"
                htmlFor="machine_id"
              >
                Machine ID
              </label>
              <select
                className="w-full ml-0 pl-1 pr-3 py-1.5 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
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
            <div className="form-group">
              <label className="text-s font-semibold px-1" htmlFor="person_id">
                Person ID
              </label>
              <select
                className="w-full ml-0 pl-1 pr-3 py-1.5 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
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
            <div className="form group flex items-center">
              <label
                className="text-s font-semibold px-1 mr-3"
                htmlFor="is_returnable"
              >
                Is Returnable
              </label>
              <select
                className="w-1/4 mt-1 py-1 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="is_returnable"
                name="is_returnable"
                value={formData.is_returnable}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="form-group">
              <label
                className="text-s font-semibold px-1"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="w-full ml-0 pl-1 pr-3 py-1.5 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
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
            <div className="form-group">
              <button
                className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 mt-8 font-semibold"
                type="submit"
              >
                Create Issue
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default page;
