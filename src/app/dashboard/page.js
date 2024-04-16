"use client";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/app/(components)/Nav";
import { useState, useEffect } from "react";

export default function Dashboard() {
  let [machines, setMachines] = useState([]);
  let [persons, setPersons] = useState([]);
  const personCategoriesCount = {};
  const machineCategoriesCount = {};
  const machineCount = machines.length;
  const personCount = persons.length;

  useEffect(() => {
    const getPersons = async () => {
      const response = await fetch("/api/Persons", {
        method: "GET",
      });

      const data = await response.json();
      persons = data;
      setPersons(persons);
      console.log(persons);
    };
    getPersons();
  }, []);

  persons.forEach((person) => {
    personCategoriesCount[person.category] =
      (personCategoriesCount[person.category] || 0) + 1;
  });
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
  machines.forEach((machine) => {
    machineCategoriesCount[machine.category] =
      (machineCategoriesCount[machine.category] || 0) + 1;
  });

  // console.log(machineCount);
  // console.log(personCount);

  console.log(personCategoriesCount);
  console.log(machineCategoriesCount);

  return (
    <div class="max-h-screen bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden  h-screen">
      <div class="mx-12">
        <div class="flex flex-col gap-1 pt-12 pb-4">
          <div class="mb-4 grid gap-y-10 gap-x-6 grid-cols-5">
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  class="w-7 h-7 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 6.5h2M11 18h2m-7-5v-2m12 2v-2M5 8h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm0 12h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm12 0h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm0-12h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z"
                  />
                </svg>
              </div>
              <div class="p-4 text-right">
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {machineCategoriesCount["electronicStudio"]
                    ? machineCategoriesCount["electronicStudio"]
                    : 0}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong>Electronic</strong>&nbsp;Studio Design
                </p>
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  class="w-7 h-7 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                </svg>
              </div>
              <div class="p-4 text-right">
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {machineCategoriesCount["mechanicalStudio"]
                    ? machineCategoriesCount["mechanicalStudio"]
                    : 0}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong>Mechanical</strong>&nbsp;Studio
                </p>
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  class="w-7 h-7 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                  />
                </svg>
              </div>
              <div class="p-4 text-right">
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {machineCategoriesCount["fabricationStudio"]
                    ? machineCategoriesCount["fabricationStudio"]
                    : 0}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong>Precision</strong>&nbsp;Fabrication
                </p>
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  class="w-7 h-7 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M8.737 8.737a21.49 21.49 0 0 1 3.308-2.724m0 0c3.063-2.026 5.99-2.641 7.331-1.3 1.827 1.828.026 6.591-4.023 10.64-4.049 4.049-8.812 5.85-10.64 4.023-1.33-1.33-.736-4.218 1.249-7.253m6.083-6.11c-3.063-2.026-5.99-2.641-7.331-1.3-1.827 1.828-.026 6.591 4.023 10.64m3.308-9.34a21.497 21.497 0 0 1 3.308 2.724m2.775 3.386c1.985 3.035 2.579 5.923 1.248 7.253-1.336 1.337-4.245.732-7.295-1.275M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  />
                </svg>
              </div>
              <div class="p-4 text-right">
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {machineCategoriesCount["manufacturingStudio"]
                    ? machineCategoriesCount["manufacturingStudio"]
                    : 0}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong>Advanced Manufacturing</strong>&nbsp;Studio
                </p>
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-600 to-purple-400 text-white shadow-purple-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  class="w-7 h-7 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="p-4 text-right">
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {machineCategoriesCount["robotics&Drone"]
                    ? machineCategoriesCount["robotics&Drone"]
                    : 0}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong>Robotics</strong>&nbsp;and <strong>Drone</strong>
                  &nbsp;Studio
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-row">
          <div className="flex flex-col justify-center items-center ml-5%">
            <div className="flex-grow flex items-center justify-center ml-12 mr-2 pr-2 pl-12 py-0 my-0 lg:mr-12 lg:pr-12 w-full mb-28">
              <Image
                src="NA_SEP._29-Converted.png"
                alt="Your Image"
                layout="fixed"
                width={600}
                height={400}
                objectFit="contain"
              />
            </div>
          </div>

          <div class="flex flex-row gap-1 pt-8 mt-2 mx-4">
            <div style={{ width: "15rem" }} class="lg:w-30">
              <div class="mb-12 grid gap-y-10 gap-x-2 grid-rows-4">
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      class="w-7 h-7 feather feather-user"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div class="p-4 text-right">
                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      {personCategoriesCount["ug"]
                        ? personCategoriesCount["ug"]
                        : 0}
                    </h4>
                  </div>
                  <div class="border-t border-blue-gray-50 p-4">
                    <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong>Under-Graduate</strong>
                    </p>
                  </div>
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      class="w-7 h-7 feather feather-user-check"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <polyline points="17 11 19 13 23 9" />
                    </svg>
                  </div>
                  <div class="p-4 text-right">
                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      {personCategoriesCount["pg"]
                        ? personCategoriesCount["pg"]
                        : 0}
                    </h4>
                  </div>
                  <div class="border-t border-blue-gray-50 p-4">
                    <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong>Post-Graduate</strong>
                    </p>
                  </div>
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      class="w-6 h-6 feather feather-user-check"
                      fill="none"
                      height="17"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      viewBox="0 0 15 15"
                      width="17"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 14.5V15H4V14.5H3ZM11 14.5V15H12V14.5H11ZM4 14.5V12.4995H3V14.5H4ZM6.5 10H8.5V9H6.5V10ZM11 12.4995V14.5H12V12.4995H11ZM8.5 10C9.88083 10 11 11.1189 11 12.4995H12C12 10.5664 10.4329 9 8.5 9V10ZM4 12.4995C4 11.1189 5.11917 10 6.5 10V9C4.56712 9 3 10.5664 3 12.4995H4ZM7.5 3C6.11929 3 5 4.11929 5 5.5H6C6 4.67157 6.67157 4 7.5 4V3ZM10 5.5C10 4.11929 8.88071 3 7.5 3V4C8.32843 4 9 4.67157 9 5.5H10ZM7.5 8C8.88071 8 10 6.88071 10 5.5H9C9 6.32843 8.32843 7 7.5 7V8ZM7.5 7C6.67157 7 6 6.32843 6 5.5H5C5 6.88071 6.11929 8 7.5 8V7ZM1.5 1H13.5V0H1.5V1ZM14 1.5V13.5H15V1.5H14ZM13.5 14H1.5V15H13.5V14ZM1 13.5V1.5H0V13.5H1ZM1.5 14C1.22386 14 1 13.7761 1 13.5H0C0 14.3284 0.671573 15 1.5 15V14ZM14 13.5C14 13.7761 13.7761 14 13.5 14V15C14.3284 15 15 14.3284 15 13.5H14ZM13.5 1C13.7761 1 14 1.22386 14 1.5H15C15 0.671573 14.3284 0 13.5 0V1ZM1.5 0C0.671573 0 0 0.671574 0 1.5H1C1 1.22386 1.22386 1 1.5 1V0Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div class="p-4 text-right">
                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      {personCategoriesCount["profs"]
                        ? personCategoriesCount["profs"]
                        : 0}
                    </h4>
                  </div>
                  <div class="border-t border-blue-gray-50 p-4">
                    <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong>Professors</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-1 pt-8 mt-2">
            <div style={{ width: "15rem" }} class="lg:w-30">
              <div class="mb-12 grid gap-y-10 gap-x-2 grid-rows-4">
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      class="w-7 h-7 feather feather-user"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div class="p-4 text-right">
                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      {personCategoriesCount["phd"]
                        ? personCategoriesCount["phd"]
                        : 0}
                    </h4>
                  </div>
                  <div class="border-t border-blue-gray-50 p-4">
                    <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong>PHD</strong>
                    </p>
                  </div>
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      class="w-7 h-7 feather feather-user-check"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <polyline points="17 11 19 13 23 9" />
                    </svg>
                  </div>
                  <div class="p-4 text-right">
                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      {personCategoriesCount["others"]
                        ? personCategoriesCount["others"]
                        : 0}
                    </h4>
                  </div>
                  <div class="border-t border-blue-gray-50 p-4">
                    <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong>Others</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
