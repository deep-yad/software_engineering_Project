# Inventory Management System

## Table of Contents

- [Introduction](#introduction)
- [Purpose](#purpose)
- [Scope](#scope)
- [General Description](#general-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Authors](#authors)

---

## Introduction

The **Inventory Management** System is a software solution developed to address the challenges faced by the **MakerSpace laboratory** in manually maintaining and tracking its equipment and consumables. This system aims to streamline inventory management processes, automate tracking, and minimize human errors, thereby optimizing the efficiency of laboratory operations.

## Purpose

The purpose of the Inventory Management System is to provide an efficient tool for laboratory staff, particularly the lab in charge, to automate inventory tracking. By doing so, it aims to:

- Optimize labor efforts
- Reduce errors
- Convert unproductive time spent on trivial tasks into more valuable activities
- Ensure smooth functioning of the MakerSpace laboratory by effectively managing equipment and consumables

## Scope

The Inventory Management System provides an interface for managing tools and machine inventory based on each item's usage, issuance, and damage. Key features include:

- Tracking inflow and outflow of items
- Keeping User and Machinery records as well as Issues
- Automatic detection of equipment shortages
- Real-time monitoring of equipment status
- Efficient management of projects and procurement
- Alert and Warning System

## General Description

The Inventory Management System is developed using Next.js framework, providing a robust and user-friendly interface for laboratory staff. It includes features such as:

- Intuitive user interface for administrator
- Comprehensive sections for inventory overview(dashboard) and issuance records
- Robust platform for managing the users and machines in the inventory
- Communication interfaces for email notifications as alerts and warnings

## Features

- **Dashboard**: Provides an overview of inventory statistics and important information.
- **Persons**: Displays registered users categorized based on their academic roles such as undergraduate (UG), postgraduate (PG), professor or others.
- **Machines**: Lists machines in the inventory along with their total quantity and available quantity, offering the functionality to categorize them based on sections such as electronics, precision, and robotics.
- **Inventory**: See the inventory information(machines and components) at one place

- **Add Person**: Empowers administrators to add new users/personnel to the system.
- **Add Machine**: Enables users to add new machines or enter new stock items into the inventory.
- **Create Issue**: Enables users to issue inventory items, effectively maintaining records.
- **Add Inventory**: Allows administrators to add new component to the inventory.
- **Alert and Warning**: Facilitates administrators in sending warning emails to users who have yet to return components.

- **Get Report**: Generate a comprehensive inventory report in PDF format. 

## Installation

To install the Inventory Management System locally, follow these steps:

1. Clone the repository: `git clone https://github.com/deep-yad/software_engineering_Project.git`
2. Navigate to the project directory: `cd software_engineering_Project`
3. Install dependencies: `npm install`

## Usage

To run the Inventory Management System locally, use the following command:

```bash
npm run dev
```

This will start the development server, and you can access the application at `http://localhost:3000`.

## Authors

Anirudh Gautam - cse220001009@iiti.ac.in
Aviral Sharma - cse220001014@iiti.ac.in
Deepak Yadav - cse220001026@iiti.ac.in
Pappala Tejaswini - cse220001055@iiti.ac.in
Vashishtha Narayan - cse220001077@iiti.ac.in