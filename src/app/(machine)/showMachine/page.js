"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function YourComponent() {
  let [machines, setMachines] = useState([]);
  let [machinesData, setMachinesData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/machine", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      machines = data;
      setMachines(machines);
      setMachinesData(machines);
      console.log("***", machines);
    }

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filterData = (searchText) => {
    if (!searchText) {
      return []; 
    }

    const lowercaseSearchText = searchText.toLowerCase(); 
    let newData = machinesData.filter(
      (item) =>
        item.machine_name.toLowerCase().includes(lowercaseSearchText)
    );

    console.log(newData);
    return newData;
  };

  
  useEffect(() => {
    const results = filterData(searchText);
    setSearchResults(results);
  }, [searchText, machinesData]);

  // Function to handle selecting a search result
  const handleSelect = (selectedItem) => {
    setSearchText(selectedItem.machine_name); // Update searchText with selected name
  };

  const flattenSubparts = (subparts) => subparts.flatMap((subpart) => subpart);

  return (
    <>
    <div className="mb-2 mt-4">
    <input
      type="text"
      placeholder="Search By Machine name"
      value={searchText}
      onChange={handleSearchChange}
      className="w-80 px-4 py-2 ml-5  border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>
    <div className="overflow-hidden h-screen rounded-lg border border-gray-200 shadow-md m-5 mt-2">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Machine Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Description
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Total Quantity
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Available Quantity
            </th>
            {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Machine ID
            </th> */}
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Subparts
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {searchResults.length>0 ?
            searchResults.map((machine) => (
              <tr
                className="hover:bg-gray-50"
                rowSpan={flattenSubparts(machine.subparts).length}
              >
                <td
                  className="px-6 py-4 font-medium text-gray-900"
                  // rowSpan={flattenSubparts(machine.subparts).length}
                >
                  {machine.machine_name}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {machine.description}
                </td>
                <td
                  className="px-6 py-4 font-medium text-gray-900"
                  // rowSpan={flattenSubparts(machine.subparts).length}
                >
                  {machine.total_quantity}
                </td>
                <td
                  className="px-6 py-4 font-medium text-gray-900"
                  // rowSpan={flattenSubparts(machine.subparts).length}
                >
                  {machine.available_quantity}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {machine.subparts.length === 0 ? (
                    <span>No subparts</span>
                  ) : (
                    <span>
                      {machine.subparts
                        .map((item) => item.machine_id.toString())
                        .join(", ")}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {" "}
                  <div className="flex justify-start gap-4">
                    <Link href={`/updateMachine/${machine._id}`}>
                      <EditIcon></EditIcon>
                    </Link>
                    <Link href={`/updateMachine/${machine._id}`}>
                      <DeleteIcon></DeleteIcon>
                    </Link>
                    <Link href={`/orders/${machine._id}`}>
                      <ShoppingCartIcon></ShoppingCartIcon>
                    </Link>
                  </div>
                </td>
              </tr>
            )):machines &&
                machines.map((machine) => (
              <tr
                className="hover:bg-gray-50"
                rowSpan={flattenSubparts(machine.subparts).length}
              >
                <td
                  className="px-6 py-4 font-medium text-gray-900"
                  // rowSpan={flattenSubparts(machine.subparts).length}
                >
                  {machine.machine_name}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {machine.description}
                </td>
                <td
                  className="px-6 py-4 font-medium text-gray-900"
                  // rowSpan={flattenSubparts(machine.subparts).length}
                >
                  {machine.total_quantity}
                </td>
                <td
                  className="px-6 py-4 font-medium text-gray-900"
                  // rowSpan={flattenSubparts(machine.subparts).length}
                >
                  {machine.available_quantity}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {machine.subparts.length === 0 ? (
                    <span>No subparts</span>
                  ) : (
                    <span>
                      {machine.subparts
                        .map((item) => item.machine_id.toString())
                        .join(", ")}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {" "}
                  <div className="flex justify-start gap-4">
                    <Link href={`/updateMachine/${machine._id}`}>
                      <EditIcon></EditIcon>
                    </Link>
                    <Link href={`/updateMachine/${machine._id}`}>
                      <DeleteIcon></DeleteIcon>
                    </Link>
                    <Link href={`/orders/${machine._id}`}>
                      <ShoppingCartIcon></ShoppingCartIcon>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default YourComponent;
