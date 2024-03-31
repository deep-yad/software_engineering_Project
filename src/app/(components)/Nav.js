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
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";

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
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Issues"} disablePadding>
            <Link href="/createIssue">
              <ListItemButton>
                <ListItemIcon>
                  <FeaturedPlayListIcon />
                </ListItemIcon>
                <ListItemText primary={"Issues"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Persons"} disablePadding>
            <Link href="/showPerson">
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"Persons"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Machines"} disablePadding>
            <Link href="/showMachine">
              <ListItemButton>
                <ListItemIcon>
                  <CoffeeMakerIcon />
                </ListItemIcon>
                <ListItemText primary={"Machines"} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={"Add Person"} disablePadding>
            <Link href="/createPerson">
              <ListItemButton>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Peson"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Add Machine"} disablePadding>
            <Link href="/addMachine">
              <ListItemButton>
                <ListItemIcon>
                  <CoffeeMakerIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Machine"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Search"} disablePadding>
            <Link href="/search">
              <ListItemButton>
                <ListItemIcon>
                  <CoffeeMakerIcon />
                </ListItemIcon>
                <ListItemText primary={"Search"} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Nav;
