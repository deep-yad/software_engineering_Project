"use client"
import React, { useEffect, useState } from 'react'
import SearchPerson from '../(components)/SearchPerson';
import SearchMachine from '../(components)/SearchMachine';
const page = () => {
  
  let [personData, setPersonData] = useState([]);
  let [machineData, setMachineData] = useState([]);




    useEffect(() => {
      const getMachine = async () => {
        const response = await fetch("/api/machine", {
          method: "GET",
        });

        const data = await response.json();
        machineData = data;
        setMachineData(machineData);
        console.log(machineData);
      };
      
      const getPersons = async () => {
        const response = await fetch("/api/Persons", {
          method: "GET",
        });
        
        const data = await response.json();
        personData = data;
        setPersonData(personData);
        // console.log(personData);
      };
      getMachine();
      getPersons();
    }, []);
  return (
    <div>
      <h1>My Search Page</h1>
      <SearchPerson data={personData} tag={"Search Person Data"} />
      <SearchMachine data={machineData} tag={"Search Machine Data"} />
    </div>
  );
};


export default page
