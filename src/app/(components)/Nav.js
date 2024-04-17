//Nav.js
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
import AddCardIcon from '@mui/icons-material/AddCard';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import ArticleIcon from '@mui/icons-material/Article';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const drawerWidth = 265;

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
                <ListItemIcon >
                  <InboxIcon className="text-indigo-600 text-5xl"/>
                </ListItemIcon>
                <div className="flex flex-col">
                  <Typography variant="h6" className="text-xl font-serif font-bold">MAKERSPACE</Typography>
                  <div className="flex-grow flex justify-center text-justify">
                  <Typography className="font-serif font-bold">IIT Indore</Typography>
                  </div>
                </div>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={"Dashboard"} className="mx-4" disablePadding>
            <Link href="/dashboard">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon className="text-indigo-500 text-2xl"/>
                </ListItemIcon>
                {/* <ListItemText primary={"Dashboard"} /> */}
                <Typography variant="h7" className="text-lg font-semibold">Dashboard</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Persons"} className="mx-4" disablePadding>
            <Link href="/showPerson">
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon className="text-indigo-500 text-2xl"/>
                </ListItemIcon>
                {/* <ListItemText primary={"Persons"} /> */}
                <Typography variant="h7" className="text-lg font-semibold">Persons</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Machines"} className="mx-4" disablePadding>
            <Link href="showMachine">
              <ListItemButton>
                <ListItemIcon>
                  <CoffeeMakerIcon className="text-indigo-500 text-2xl"/>
                </ListItemIcon>
                {/* <ListItemText primary={"Machines"} /> */}
                <Typography variant="h7" className="text-lg font-semibold">Machines</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Create Issue"} className="mx-4" disablePadding>
             <Link href="/inventory">
              <ListItemButton>
                <ListItemIcon>
                  <ChairAltIcon className="text-indigo-500 text-2xl font-bold"/>
                </ListItemIcon>
                <Typography variant="h7" className="text-lg font-semibold">Inventory</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={"Add Person"} className="mx-4" disablePadding>
            <Link href="/createPerson">
              <ListItemButton>
                <ListItemIcon>
                  <PersonAddIcon className="text-indigo-500 text-2xl"/>
                </ListItemIcon>
                {/* <ListItemText primary={"Add Peson"} /> */}
                <Typography variant="h7" className="text-lg font-semibold">Add Person</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Add Machine"} className="mx-4" disablePadding>
            <Link href="/addMachine">
              <ListItemButton>
                <ListItemIcon>
                  <AddShoppingCartIcon className="text-indigo-500 text-2xl"/>
                </ListItemIcon>
                {/* <ListItemText primary={"Add Machine"} /> */}
                <Typography variant="h7" className="text-lg font-semibold">Add Machine</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Create Issue"} className="mx-4" disablePadding>
            <Link href="/createIssue">
              <ListItemButton>
                <ListItemIcon>
                  <AddCardIcon className="text-indigo-500 text-2xl"/>
                </ListItemIcon>
                <Typography variant="h7" className="text-lg font-semibold">Create Issue</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Create Issue"} className="mx-4 mb-2" disablePadding>
             <Link href="/addinventory">
              <ListItemButton>
                <ListItemIcon>
                  <DomainAddIcon className="text-indigo-500 text-2xl"/>
                </ListItemIcon>
                <Typography variant="h7" className="text-lg font-semibold">Add Inventory</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <Divider/>
          <ListItem key={"Create Issue"} className="mx-4 mt-2" disablePadding>
             <Link href="/pdf">
              <ListItemButton >
                <ListItemIcon>
                  <ArticleIcon className="text-indigo-500 text-2xl"/>
                </ListItemIcon>
                <Typography variant="h7" className="text-lg font-semibold">Get Report</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
         
        </List>
      </Drawer>
    </Box>
  );
};

export default Nav;