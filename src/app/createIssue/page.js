"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
export const dynamic = "force-static";

const page = () => {
  const router = useRouter();

  const defaultFormData = {
    issue_id: "0",
    machine_id: "0",
    person_id: "0",
    is_returnable: true,
    due_date: "10/11/2024",
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
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      //@ts-ignore
      "Content-Type": "application/json",
    });

    if (res.ok) {
      const issue = await res.json();
      console.log(issue);
      setSelectedPerson((prevPerson) => ({
        ...prevPerson,
        current: [...prevPerson.current, { issue_id: issue.id }],
      }));
      updatePerson(selectedPerson);
    } else {
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
    <div>
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <label>machine_id</label>
          <select
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

          <br />

          <label>person_id</label>
          <select
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

          <br />
          <label>is_returnable</label>
          <input
            id="is_returnable"
            name="is_returnable"
            type="text"
            value={formData.is_returnable}
            onChange={handleChange}
          />
          <br />
          <label>order_is_completed</label>
          <input
            id="order_is_completed"
            name="order_is_completed"
            type="text"
            value={formData.order_is_completed}
            onChange={handleChange}
          />
          <label>description</label>
          <br />
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
          <input type="submit" value={"Create Issue"} />
        </form>
      </div>
    </div>
  );
};

export default page;
