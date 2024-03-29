// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// function YourComponent() {
//   let [machines, setMachines] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch("/api/machine", {
//         method:"GET",
//       });
//       const data = await response.json();
//       console.log(data);
//       machines = data;
//       setMachines(machines);
//       console.log("***",machines);
//     }

//     fetchData();
//   }, []);
//   const flattenSubparts = (subparts) => subparts.flatMap((subpart) => subpart);

//   return (
//     <div className="container mx-auto mt-8  flex items-center justify-center">
//       <table className="table-auto border-collapse border border-gray-800">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-800 px-4 py-2">Machine Name</th>
//             <th className="border border-gray-800 px-4 py-2">Description</th>
//             <th className="border border-gray-800 px-4 py-2">Total Quantity</th>
//             <th className="border border-gray-800 px-4 py-2">
//               Available Quantity
//             </th>
//             <th className="border border-gray-800 px-4 py-2">Machine ID</th>
//             <th className="border border-gray-800 px-4 py-2">Subparts ID</th>
//             <th className="border border-gray-800 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {machines &&
//             machines.map((machine) => (
//               <tr>
//                 <td
//                   className="border border-gray-800 px-4 py-2"
//                   rowSpan={flattenSubparts(machine.subparts).length}
//                 >
//                   {machine.machine_name}
//                 </td>
//                 <td className="border border-gray-800 px-4 py-2">
//                   {machine.description}
//                 </td>
//                 <td
//                   className="border border-gray-800 px-4 py-2"
//                   rowSpan={flattenSubparts(machine.subparts).length}
//                 >
//                   {machine.total_quantity}
//                 </td>
//                 <td
//                   className="border border-gray-800 px-4 py-2"
//                   rowSpan={flattenSubparts(machine.subparts).length}
//                 >
//                   {machine.available_quantity}
//                 </td>
//                 <td
//                   className="border border-gray-800 px-4 py-2"
//                   rowSpan={flattenSubparts(machine.subparts).length}
//                 >
//                   {machine._id}
//                 </td>
//                 {flattenSubparts(machine.subparts).length?<td
//                   className="border border-gray-800 px-4 py-2"
//                   rowSpan={flattenSubparts(machine.subparts).length}
//                 >
//                   {flattenSubparts(machine.subparts).map((subpart) => (
//                     <td>{subpart._id}</td>
//                   ))}
//                 </td>:<center>-</center>}
//                 <td className="border border-gray-800 px-4 py-2">
//                   {" "}
//                   <Link
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     href={`/updateMachine/${machine._id}`}
//                   >
//                     <button>Edit</button>
//                   </Link>
//                   <Link
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
//                     href={`/updateMachine/${machine._id}`}
//                   >
//                     <button>Delete</button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           {/* {machines &&
//             machines.map((machine) =>
              
//               flattenSubparts(machine.subparts).map((subpart, index) => (
//                 <tr key={index} className="border border-gray-800">
//                   {index === 0 && ( // Only render machine details for the first subpart
//                     <>
//                       <td
//                         className="border border-gray-800 px-4 py-2"
//                         rowSpan={flattenSubparts(machine.subparts).length}
//                       >
//                         {machine.machine_name}
//                       </td>
//                       <td
//                         className="border border-gray-800 px-4 py-2"
//                         rowSpan={flattenSubparts(machine.subparts).length}
//                       >
//                         {machine.description}
//                       </td>
//                       <td
//                         className="border border-gray-800 px-4 py-2"
//                         rowSpan={flattenSubparts(machine.subparts).length}
//                       >
//                         {machine.total_quantity}
//                       </td>
//                       <td
//                         className="border border-gray-800 px-4 py-2"
//                         rowSpan={flattenSubparts(machine.subparts).length}
//                       >
//                         {machine.available_quantity}
//                       </td>
//                     </>
//                   )}
//                   <td className="border border-gray-800 px-4 py-2">
//                     {subpart.machine_id}
//                   </td>
//                   <td className="border border-gray-800 px-4 py-2">
//                     {" "}
//                     <Link
//                       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                       href={`/updateMachine/${machine._id}`}
//                     >
//                       <button>Edit</button>
//                     </Link>
//                     <Link
//                       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
//                       href={`/updateMachine/${machine._id}`}
//                     >
//                       <button>Delete</button>
//                     </Link>
//                   </td>
//                 </tr>
//               )
//               )
//             )} */}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default YourComponent;



"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

function YourComponent() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/machine");
      const data = await response.json();
      console.log(data.machine);
      setMachines(data.machine);
      console.log(machines);
    }

    fetchData();
  }, []);
  const flattenSubparts = (subparts) => subparts.flatMap((subpart) => subpart);

  return (
    <div className="container mx-auto mt-8  flex items-center justify-center">
      <table className="table-auto border-collapse border border-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-800 px-4 py-2">Machine Name</th>
            <th className="border border-gray-800 px-4 py-2">Description</th>
            <th className="border border-gray-800 px-4 py-2">Total Quantity</th>
            <th className="border border-gray-800 px-4 py-2">
              Available Quantity
            </th>
            <th className="border border-gray-800 px-4 py-2">Machine ID</th>
            <th className="border border-gray-800 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {machines &&
            machines.map((machine) =>
              flattenSubparts(machine.subparts).map((subpart, index) => (
                <tr key={index} className="border border-gray-800">
                  {index === 0 && ( // Only render machine details for the first subpart
                    <>
                      <td
                        className="border border-gray-800 px-4 py-2"
                        rowSpan={flattenSubparts(machine.subparts).length}
                      >
                        {machine.machine_name}
                      </td>
                      <td
                        className="border border-gray-800 px-4 py-2"
                        rowSpan={flattenSubparts(machine.subparts).length}
                      >
                        {machine.description}
                      </td>
                      <td
                        className="border border-gray-800 px-4 py-2"
                        rowSpan={flattenSubparts(machine.subparts).length}
                      >
                        {machine.total_quantity}
                      </td>
                      <td
                        className="border border-gray-800 px-4 py-2"
                        rowSpan={flattenSubparts(machine.subparts).length}
                      >
                        {machine.available_quantity}
                      </td>
                    </>
                  )}
                  <td className="border border-gray-800 px-4 py-2">
                    {subpart.machine_id}
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {" "}
                    <Link
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      href={`/updateMachine/${machine._id}`}
                    >
                      <button>Edit</button>
                    </Link>
                    <Link
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
                      href={`/updateMachine/${machine._id}`}
                    >
                      <button>Delete</button>
                    </Link>
                    <Link
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
                      href={`/orders/${machine._id}`}
                    >
                      <button>Orders</button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  );
}

export default YourComponent;