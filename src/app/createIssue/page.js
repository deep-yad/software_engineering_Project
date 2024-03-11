"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
export const dynamic = "force-static";

const page = () => {
  const defaultFormData = {
    issue_id: "0",
    machine_id: "0",
    person_id: "0",
    is_returnable: true,
    due_date: "10/11/2024",
    order_is_completed: false,
    description: "dj",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Issues", {
      method: "POST",
      body: JSON.stringify({ formData }),
      //@ts-ignore
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Failed to create ticket");
    }
  };

  return (
    <div>
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <label>issue_id</label>
          <input
            id="issue_id"
            name="issue_id"
            type="text"
            value={formData.issue_id}
            onChange={handleChange}
          />
          <label>machine_id</label>
          <input
            id="machine_id"
            name="machine_id"
            type="text"
            value={formData.machine_id}
            onChange={handleChange}
          />
          <label>person_id</label>
          <input
            id="person_id"
            name="person_id"
            type="text"
            value={formData.person_id}
            onChange={handleChange}
          />
          <label>is_returnable</label>
          <input
            id="is_returnable"
            name="is_returnable"
            type="text"
            value={formData.is_returnable}
            onChange={handleChange}
          />
          <label>order_is_completed</label>
          <input
            id="order_is_completed"
            name="order_is_completed"
            type="text"
            value={formData.order_is_completed}
            onChange={handleChange}
          />
          <label>description</label>
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
