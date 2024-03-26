"use client";
import { React, useState, useEffect } from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@mui/icons-material/History";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from '@mui/icons-material/Delete';
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

const getPersons = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Persons", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch persons");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading presons: ", error);
  }
};

const deletePerson = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Persons/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    router.refresh();
  }
};

const page = () => {
  let [persons, setPersons] = useState(null);
  const [currentIssues, setCurrentIssues] = useState([]);
  const [completedIssues, setCompletedIssues] = useState([]);
  const [openPopup, setOpenPopup] = useState(false); // State for popup visibility
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
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
    const formData = { userId: userId,issueId: issueId };
    const res = await fetch(`http://localhost:3000/api/mail`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.refresh();
    }
  };
  const handleCurrentIssue = async (userId, issueId) => {
    console.log(userId);
    const formData = { userId: userId,issueId: issueId };
    const res = await fetch(`http://localhost:3000/api/updateIssue`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.refresh();
    }
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
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                See History
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
                <td className="px-6 py-4">
                  <Button onClick={() => handlePopupOpen(person)}>
                    <HistoryIcon></HistoryIcon> See History
                  </Button>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <Link href={`/deletePerson/${person._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </Link>
                    <Link
                      x-data="{ tooltip: 'Edite' }"
                      href={`/updatePerson/${person._id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog open={openPopup} onClose={handlePopupOpen} maxWidth="md" fullWidth>
      <DialogTitle>
        {selectedPerson && selectedPerson.person_name}'s Details
        <IconButton onClick={handlePopupClose} aria-label="close">
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2">Current Items:</Typography>
        <ul>
          {selectedPerson &&
            selectedPerson.current &&
            selectedPerson.current.map((item, index) => (
              <li key={index}>
                {item._id}
                <Button onClick={() => handleEmailSend(selectedPersonId, item._id)}>
                  <EmailIcon />
                  Send Warning mail
                </Button>
                <Button onClick={() => handleCurrentIssue(selectedPersonId, item._id)}><DeleteIcon/>
                   Remove 
                </Button>
              </li>
            ))}
        </ul>
        <Typography variant="body2">Completed Items:</Typography>
        <ul>
          {selectedPerson &&
            selectedPerson.completed &&
            selectedPerson.completed.map((item, index) => (
              <li key={index}>{item._id}</li>
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
