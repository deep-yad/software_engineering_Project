import Machine from "@/app/models/machine";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const machine = await Machine.find();
    // console.log(machine);
    return Response.json(machine);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    console.log("lol");
    const body = await req.json();
    console.log("problem");
    const machineData = body.formData;

    const result = await Machine.create(machineData);

    return NextResponse.json(
      { message: "machine Created", id: result._id },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
