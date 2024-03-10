import Machine from "@/models/machine";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import bodyParser from "body-parser";
export const dynamic = "force-static";



export async function POST(req) {
  try {
    console.log("lol");
    const {
      machineName,
      description,
      totalQuantity,
      availableQuantity,
      hasSubparts,
      subParts,
    } = await req.json();
    const con = await connectToDB();
    console.log("connected");

    console.log("problem");
    console.log("Machine Name:", machineName);
    console.log("Description:", description);
    console.log("Total Quantity:", totalQuantity);
    console.log("Available Quantity:", availableQuantity);
    console.log("Has Subparts:", hasSubparts);
   // console.log("Subparts:", subParts);
    const subPartsData = subParts.map(subPart => ({
      subpart_name: subPart, 
      subpart_available_quantity: 1
    }));
    console.log(subPartsData)
    const newMachine = new Machine({
      machine_id: 12,
      machine_name: machineName,
      description: description,
      total_quantity: totalQuantity,
      available_quantity: availableQuantity,
      subparts:subPartsData,
        current: [{ issue_id: 0 }], // Initialize with empty objects containing issue_id
        completed: [{ issue_id: 1 }]
    });
    await newMachine.save();
    return new Response(JSON.stringify(newMachine), { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}



export async function GET() {
  try {
    const con = await connectToDB();
    const machine = await Machine.find();
    return NextResponse.json({data:machine}, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error", error}, { status: 500 });
    }
}
