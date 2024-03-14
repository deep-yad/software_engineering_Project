"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

function UpdateMachine({ params }) {
  const { id } = params;
  const [machine, setMachine] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    async function fetchMachine() {
      const response = await fetch(`/api/machine/${id}`);
      const data = await response.json();
      console.log(data.foundMachine);
      setMachine(data.foundMachine);
      setFormData(data.foundMachine);
    }
    fetchMachine();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await fetch(`http://localhost:3000/api/machine/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });
       console.log("updated machine")
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      
      const response = await fetch(`http://localhost:3000/api/machine/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
       console.log(" machine deleted")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!machine) {
    return <p>Loading...</p>;
  }

  return (
    <div className= "bg-orange-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Update Machine</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="machine_name" className="block text-gray-700 font-semibold mb-1">Machine Name:</label>
        <input
          type="text"
          id="machine_name"
          name="machine_name"
          value={formData.machine_name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-80 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-80 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="total_quantity" className="block text-gray-700 font-semibold mb-1">Total Quantity:</label>
        <input
          type="number"
          id="total_quantity"
          name="total_quantity"
          value={formData.total_quantity}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-80 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="available_quantity" className="block text-gray-700 font-semibold mb-1">Available Quantity:</label>
        <input
          type="number"
          id="available_quantity"
          name="available_quantity"
          value={formData.available_quantity}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-80 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update Machine</button>
      <button onClick={handleDelete} type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"><Link  href={`/showMachine`}>
                    <button>Delete Machine</button>
                  </Link></button>
    </form>
  </div>
    </div>
  
  );
}

export default UpdateMachine;
