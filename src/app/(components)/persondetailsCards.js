import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";
import { useRouter } from "next/router";

const PersonDetailsCard = ({ selectedPerson, onClose }) => {
  const [machineDetailsArray, setMachineDetailsArray] = useState([]);
  const [completedMachineDetailsArray, setCompletedMachineDetailsArray] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMachineDetails = async () => {
      if (!selectedPerson) return;
      const currentItems = selectedPerson.current.map(async (item) => {
        const machineDetails = await handleGetIssueDetails(item.issue_id);
        return {
          itemId: item._id,
          machineDetails: machineDetails,
        };
      });
      const completedItems = selectedPerson.completed.map(async (item) => {
        const machineDetails = await handleGetIssueDetails(item.issue_id);
        return {
          itemId: item._id,
          machineDetails: machineDetails,
        };
      });

      const currentMachineDetails = await Promise.all(currentItems);
      const completedMachineDetails = await Promise.all(completedItems);

      setMachineDetailsArray(currentMachineDetails);
      setCompletedMachineDetailsArray(completedMachineDetails);
    };

    fetchMachineDetails();
  }, [selectedPerson]);

  const handleGetIssueDetails = async (issueId) => {
    // Fetch issue details based on the issueId
    // You can implement this function according to your API endpoint
  };

  const handleEmailSend = async (userId, issueId) => {
    // Handle sending email
  };

  const handleCurrentIssue = async (userId, issueId) => {
    // Handle updating current issue
  };

  return (
    <Dialog open={Boolean(selectedPerson)} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {selectedPerson && selectedPerson.person_name}'s Details
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2">Current Items:</Typography>
        <ul>
          {machineDetailsArray.map((item, index) => (
            <li key={index}>
              <span className="mr-4">Machine Name: {item.machineDetails.machineName}</span>
              <span className="mx-4">Due Data: {item.machineDetails.dueDate}</span>
              <Button onClick={() => handleEmailSend(selectedPersonId, item.itemId)}>
                <EmailIcon />
                Send Warning mail
              </Button>
              <Button onClick={() => handleCurrentIssue(selectedPersonId, item.itemId)}>
                <DeleteIcon />
                Remove
              </Button>
            </li>
          ))}
        </ul>
        <Typography variant="body2">Completed Items:</Typography>
        <ul>
          {completedMachineDetailsArray.map((item, index) => (
            <li key={index}>
              <span className="mr-4">Machine Name: {item.machineDetails.machineName}</span>
            </li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonDetailsCard;
