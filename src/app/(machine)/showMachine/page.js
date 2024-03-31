"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function YourComponent() {
  let [machines, setMachines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/machine", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      machines = data;
      setMachines(machines);
      console.log("***", machines);
    }

    fetchData();
  }, []);
  const flattenSubparts = (subparts) => subparts.flatMap((subpart) => subpart);

  return (
    <div className="overflow-hidden h-screen rounded-lg border border-gray-200 shadow-md m-5">
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
          {machines &&
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
                  <div className="flex justify-end gap-4">
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
  );
}

export default YourComponent;
