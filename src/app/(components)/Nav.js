"use client";
import * as React from "react";
import Dashboard from "../dashboard/page";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 200;

import Link from "next/link";

const Nav = () => {
  return (
    // <div className="my-4 flex gap-4 justify-center border-gray-500 border-2 p-2">
    //   <Link href="/" className="bg-blue-400 p-2">
    //     Home
    //   </Link>
    //   <Link href="/createIssue" className="bg-blue-400 p-2">
    //     Create Issue
    //   </Link>
    //   <Link href="/inuse" className="bg-blue-400 p-2">
    //     Inuse
    //   </Link>
    // </div>
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem key={"MAKERSPACE"} disablePadding>
            <Link href="https://www.iiti.ac.in/public/storage/BoG/48th_BoG.pdf">
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"MAKERSPACE"} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={"Dashboard"} disablePadding>
            <Link href="/dashboard">
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Issues"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Issues"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Persons"} disablePadding>
            <Link href="/showPerson">
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Persons"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Machines"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Machines"} />
            </ListItemButton>
          </ListItem>
        </List>
        {/* <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    </Box>
  );
};

export default Nav;
