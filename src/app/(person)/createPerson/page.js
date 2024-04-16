"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = `
.container {
  max-width: 500px;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.label {
  font-size: 1rem;
}

.input {
  align-self: flex-end;
  margin-left: 1rem;
  padding: 0.5rem;
  width: 60%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
`;

const page = () => {
  const router = useRouter();
  const defaultFormData = {
    email_id: "",
    person_name: "",
    mobile_number: "",
    category: "",
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
    const res = await fetch("/api/Persons", {
      method: "POST",
      body: JSON.stringify({ formData }),
      //@ts-ignore
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      toast.error("Something went wrong! Try again");
      throw new Error("Failed to add person.");
    }
    toast.success("Person Added Successfully");
    router.refresh();
    router.push("/showPerson");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <ToastContainer />
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-bold text-3xl text-gray-900">
                Enter Person Details
              </h2>
            </div>
            <form
              className="form space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-3">
                  <label
                    className="text-s font-semibold px-1"
                    htmlFor="email_id"
                  >
                    Email ID
                  </label>
                  <input
                    className="w-full ml-0 pl-1 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
                    id="email_id"
                    name="email_id"
                    type="text"
                    value={formData.email_id}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-3">
                  <label
                    className="text-s font-semibold px-1"
                    htmlFor="person_name"
                  >
                    Name
                  </label>
                  <input
                    className="w-full ml-0 pl-1 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
                    id="person_name"
                    name="person_name"
                    type="text"
                    value={formData.person_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-3">
                  <label
                    className="text-s font-semibold px-1"
                    htmlFor="mobile_number"
                  >
                    Mobile Number
                  </label>
                  <input
                    className="w-full ml-0 pl-1 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
                    id="mobile_number"
                    name="mobile_number"
                    type="text"
                    value={formData.mobile_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-s font-semibold"
                  htmlFor="machine_id"
                >
                  Category
                </label>
                <select
                  className="w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="machine_id"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="ug">Undergraduate</option>
                  <option value="pg">Postgraduate</option>
                  <option value="phd">PHD</option>
                  <option value="prof">Professor</option>
                  <option value="other">Others</option>
                </select>
              </div>

              <div className="flex -mx-3">
                <div className="w-full px-3 mt-5">
                  <button
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                    type="submit"
                  >
                    Add Person
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
