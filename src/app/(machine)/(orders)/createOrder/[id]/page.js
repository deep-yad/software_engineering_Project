
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const router = useRouter();
  // Assuming 'params.id' is the dynamic part of the route

  const defaultOrder = {
    purchase_date: "",
    model: "",
    make: "",
    build_number: 0,
    quantity: 0,
    vendor: "",
  };

  let [orderFormData, setOrderFormData] = useState(defaultOrder);
  let [formData, setFormData] = useState(null);

  useEffect(() => {
    const getMachineById = async () => {
      console.log(params.id);
      if (params.id) {
        // Make sure the params.id is not undefined
        try {
          const res = await fetch(
            `http://localhost:3000/api/machine/${params.id}`,
            {
              cache: "no-store",
            }
          );

          if (!res.ok) {
            throw new Error("Failed to fetch machine");
          }

          const data = await res.json();
          setFormData(data.foundMachine);
          console.log(formData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getMachineById();
  }, []); // This effect runs when 'params.id' changes

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setOrderFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    formData.orders.push(orderFormData);
    console.log(orderFormData);

    fetch(`http://localhost:3000/api/machine/${params.id}`, {
      // Make sure to use 'params.id' from 'router.query'
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("updated machine order", data);
        router.refresh(); // 'router.refresh()' is not a function in Next.js, use 'router.reload()' instead
        router.push("/showMachine");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-bold text-3xl text-gray-900">
                Enter Order Details
              </h2>
            </div>
            <form
              className="form space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              method="post"
              onSubmit={handleSubmit}
            >
              {/* purchase_date: "23/23/23",
    model: "Hey",
    make: "Here",
    build_number: 38940,
    quantity: 34,
    vendor: "Nfie", */}
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-3">
                  <label
                    className="text-s font-semibold px-1"
                    htmlFor="purchase_date"
                  >
                    Purchase Date
                  </label>
                  <input
                    className="w-full ml-0 pl-1 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
                    id="purchase_date"
                    name="purchase_date"
                    type="text"
                    value={orderFormData.purchase_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-3">
                  <label className="text-s font-semibold px-1" htmlFor="model">
                    Model
                  </label>
                  <input
                    className="w-full ml-0 pl-1 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
                    id="model"
                    name="model"
                    type="text"
                    value={orderFormData.model}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-3">
                  <label className="text-s font-semibold px-1" htmlFor="make">
                    Make
                  </label>
                  <input
                    className="w-full ml-0 pl-1 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
                    id="make"
                    name="make"
                    type="text"
                    value={orderFormData.make}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-3">
                  <label
                    className="text-s font-semibold px-1"
                    htmlFor="build_number"
                  >
                    Build Number
                  </label>
                  <input
                    className="w-full ml-0 pl-1 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
                    id="build_number"
                    name="build_number"
                    type="number"
                    min={0}
                    value={orderFormData.build_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-3">
                  <label
                    className="text-s font-semibold px-1"
                    htmlFor="quantity"
                  >
                    Quantity
                  </label>
                  <input
                    className="w-full ml-0 pl-1 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={0}
                    value={orderFormData.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-3">
                  <label className="text-s font-semibold px-1" htmlFor="vendor">
                    Vendor
                  </label>
                  <input
                    className="w-full ml-0 pl-1 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500"
                    id="vendor"
                    name="vendor"
                    type="text"
                    value={orderFormData.vendor}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mt-5">
                  <button
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                    type="submit"
                  >
                    Add Order
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
