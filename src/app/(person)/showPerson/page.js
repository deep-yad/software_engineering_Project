"use client";
import { React, useState, useEffect } from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@mui/icons-material/History";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  CloseIcon,
} from "@mui/material";


const page = () => {
  let [persons, setPersons] = useState(null);
  const [currentIssues, setCurrentIssues] = useState([]);
  const [completedIssues, setCompletedIssues] = useState([]);
  const [openPopup, setOpenPopup] = useState(false); // State for popup visibility
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  let [machineDetailsArray, setMachineDetailsArray] = useState([]);
  let [completedMachineDetailsArray, setcompletedMachineDetailsArray] = useState([]);
  const [selectedIssueDuedate, setSelectedIssueDuedate] = useState(null);

  const router = useRouter();
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

  
  useEffect(() => {
    const fetchMachineDetailsForCurrentItems = async () => {
      if (!selectedPerson) return;
      const updatedMachineDetailsArray = await Promise.all(
        selectedPerson.current.map(async (item) => {
          const machineDetails = await handleGetIssueDetails(item.issue_id);
          return {
            itemId: item._id,
            machineDetails: machineDetails,
          };
        })
      );
      console.log(updatedMachineDetailsArray);
      setMachineDetailsArray(updatedMachineDetailsArray);
      console.log(machineDetailsArray);
    };
    const fetchMachineDetailsForCompletedItems = async () => {
      if (!selectedPerson) return;
      const updatedCompletedMachineDetailsArray = await Promise.all(
        selectedPerson.completed.map(async (item) => {
          const machineDetails = await handleGetIssueDetails(item.issue_id);
          return {
            itemId: item._id,
            machineDetails: machineDetails,
          };
        })
      );
      console.log(updatedCompletedMachineDetailsArray);
      setcompletedMachineDetailsArray(updatedCompletedMachineDetailsArray)
      console.log(completedMachineDetailsArray);
    };

    fetchMachineDetailsForCurrentItems().catch((error) => {
      console.error("Error fetching machine details:", error);
    });
    fetchMachineDetailsForCompletedItems().catch((error) => {
      console.error("Error fetching machine details:", error);
    });
  }, [selectedPerson]);

  useEffect(() => {
    console.log(machineDetailsArray);
  }, [machineDetailsArray]);
  useEffect(() => {
    console.log(machineDetailsArray);
  }, [completedMachineDetailsArray]);
  

  const handlePopupOpen = (person) => {
    setSelectedPerson(person);
    setSelectedPersonId(person._id);
    console.log(person);
    setOpenPopup(true);
  };

  const handlePopupClose = () => {
    setSelectedPerson(null);
    setSelectedPersonId(null);
    setOpenPopup(false);
  };

  const handleEmailSend = async (userId, issueId) => {
    console.log(userId);
    const formData = { userId: userId, issueId: issueId };
    const res = await fetch(`http://localhost:3000/api/mail`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
    }
    router.refresh();
  };
  const handleCurrentIssue = async (userId, issueId) => {
    console.log(userId);
    const formData = { userId: userId, issueId: issueId };
    const res = await fetch(`http://localhost:3000/api/updateIssue`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
    }
    router.refresh();
  };
  const handleGetIssueDetails = async (issueId) => {
    const res = await fetch(`http://localhost:3000/api/Issues/${issueId}`, {
      method: "GET",
    });
    const data = await res.json();
    const machine_id = data.foundIssue.machine_id;
    console.log(machine_id);
    console.log(data.foundIssue.due_date);
    const res2 = await fetch(
      `http://localhost:3000/api/machine/${machine_id}`,
      {
        method: "GET",
      }
    );
    const data2 = await res2.json();
    console.log(data2.foundMachine.machine_name);
    return {
      machineName: data2.foundMachine.machine_name,
      dueDate: data.foundIssue.due_date,
    };
    if (res.ok) {
    }
    router.refresh();
  };

  const fetchMachineDetailsForCurrentItems = async () => {
    const machineDetailsPromises = selectedPerson.current.map(async (item) => {
      const machineDetails = await handleGetIssueDetails(item.issue_id);
      console.log(machineDetails);
      return {
        itemId: item.issue_id,
        machineDetails: machineDetails,
      };
    });

    // Wait for all promises to resolve
    return await Promise.all(machineDetailsPromises);
  };

  return (
    <>
      <div className="overflow-hidden h-screen rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Current_Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Mobile No
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {persons?.map((person, personIndex) => (
              <tr className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div class="text-sm">
                    <div className="font-medium text-gray-700">
                      {person.person_name}
                    </div>
                    <div className="text-gray-400">{person.email_id}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Cleared
                  </span>
                </td>
                <td className="px-6 py-4">{person.mobile_number}</td>

                <td className="px-3 py-4">
                  <div className="flex justify-end gap-4">
                    <Link href={`/deletePerson/${person._id}`}>
                      <DeleteIcon></DeleteIcon>
                    </Link>
                    <Link
                      x-data="{ tooltip: 'Edite' }"
                      href={`/updatePerson/${person._id}`}
                    >
                      <EditIcon></EditIcon>
                    </Link>
                    <button onClick={() => handlePopupOpen(person)}>
                      <HistoryIcon> </HistoryIcon>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog
          open={openPopup}
          onClose={handlePopupOpen}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedPerson && selectedPerson.person_name}'s Details
            <IconButton
              onClick={handlePopupClose}
              aria-label="close"
            ></IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="body2">Current Items:</Typography>
            <ul>
            {machineDetailsArray &&
                machineDetailsArray.map((item, index) => (
                  <li key={index}>
                    <span className="mr-4">Machine Name: {item.machineDetails.machineName}</span>
                    <span className="mx-4">Due Data: {item.machineDetails.dueDate}</span>
                    <Button
                      onClick={() =>
                        handleEmailSend(selectedPersonId, item.itemId)
                      }
                    >
                      <EmailIcon  />
                      Send Warning mail
                    </Button>
                    <Button
                      onClick={() =>
                        handleCurrentIssue(selectedPersonId, item.itemId)
                      }
                    >
                      <DeleteIcon />
                      Remove
                    </Button>
                  </li>
                ))}
            </ul>
            <Typography variant="body2">Completed Items:</Typography>
            <ul>
            {completedMachineDetailsArray &&
                completedMachineDetailsArray.map((item, index) => (
                  <li key={index}>
                    <span className="mr-4">Machine Name: {item.machineDetails.machineName}</span>
                  </li>
                ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default page;
