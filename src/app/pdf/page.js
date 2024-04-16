"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";

const Page = () => {
  const router = useRouter();
  const [machines, setMachines] = useState([]);
  const [docDefinition, setDocDefinition] = useState({ content: [] });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/machine", {
        method: "GET",
      });
      const data = await response.json();
      setMachines(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setDocDefinition({
      content: machines
        .map((machine) => {
          return [
            {
              text: machine.machine_name,
              style: "header",
            },
            {
              columns: [
                {
                  text: `Description: ${machine.description}`,
                  width: "auto",
                  margin: [0, 0, 10, 0], // Right margin of 10
                },
                {
                  text: `Total Quantity: ${machine.total_quantity}`,
                  width: "auto",
                  margin: [0, 0, 10, 0],
                },
                {
                  text: `Available Quantity: ${machine.available_quantity}`,
                  width: "auto",
                },
              ],
            },
            {
              text: "Subparts",
              style: "subheader",
            },
            machine.subparts.length > 0
              ? {
                  ul: machine.subparts.map((subpart) =>
                    subpart.machine_id.toString()
                  ),
                }
              : {
                  text: "No subparts",
                  italics: true,
                },
            {
              text: "Orders",
              style: "subheader",
            },
            machine.orders.length > 0
              ? {
                  table: {
                    body: [
                      [
                        "Purchase Date",
                        "Model",
                        "Make",
                        "Build Number",
                        "Quantity",
                        "Vendor",
                      ],
                      ...machine.orders.map((order) => [
                        order.purchase_date,
                        order.model,
                        order.make,
                        order.build_number,
                        order.quantity,
                        order.vendor,
                      ]),
                    ],
                  },
                  layout: "lightHorizontalLines",
                }
              : {
                  text: "No orders",
                  italics: true,
                },
            {
              text: " ",
              style: "spacer",
            },
          ];
        })
        .flat(),
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 20, 0, 10],
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        spacer: {
          margin: [0, 0, 0, 10],
        },
      },
    });
  }, [machines]);

  const downloadPdf = () => {
    pdfMake.vfs = vfsFonts.pdfMake.vfs; // Set the fonts for pdfMake
    pdfMake.createPdf(docDefinition).download("output.pdf");
    router.refresh();
    router.push("/");
  };

  useEffect(() => {
    if (docDefinition.content.length > 0) {
      // Check if the document definition has content
      downloadPdf(); // Call the download function
    }
  }, [docDefinition]);
};

export default Page;
