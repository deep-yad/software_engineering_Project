"use client"
import { useEffect, useState } from 'react';

function YourComponent() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/create/newMachine');
      const data = await response.json();
      console.log(data);
      setMachines(data.data);
      console.log(machines);
      console.log(machines.subparts)
    }
    
    fetchData();
  }, []);
  const flattenSubparts = (subparts) => subparts.flatMap(subpart => subpart);

  return (
    <div className="container mx-auto mt-8">
    <table className="table-auto border-collapse border border-gray-800">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-800 px-4 py-2">Machine Name</th>
          <th className="border border-gray-800 px-4 py-2">Description</th>
          <th className="border border-gray-800 px-4 py-2">Total Quantity</th>
          <th className="border border-gray-800 px-4 py-2">Available Quantity</th>
          <th className="border border-gray-800 px-4 py-2">Subpart Name</th>
          <th className="border border-gray-800 px-4 py-2">Subpart available Qt.</th>
        </tr>
      </thead>
      <tbody>
        {machines.map(machine => (
          flattenSubparts(machine.subparts).map((subpart, index) => (
            <tr key={index} className="border border-gray-800">
              {index === 0 && ( // Only render machine details for the first subpart
                <>
                  <td className="border border-gray-800 px-4 py-2" rowSpan={flattenSubparts(machine.subparts).length}>{machine.machine_name}</td>
                  <td className="border border-gray-800 px-4 py-2" rowSpan={flattenSubparts(machine.subparts).length}>{machine.description}</td>
                  <td className="border border-gray-800 px-4 py-2" rowSpan={flattenSubparts(machine.subparts).length}>{machine.total_quantity}</td>
                  <td className="border border-gray-800 px-4 py-2" rowSpan={flattenSubparts(machine.subparts).length}>{machine.available_quantity}</td>
                </>
              )}
              <td className="border border-gray-800 px-4 py-2">{subpart.subpart_name}</td>
              <td className="border border-gray-800 px-4 py-2">{subpart.subpart_available_quantity}</td>
            </tr>
          )
          
          )
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default YourComponent;