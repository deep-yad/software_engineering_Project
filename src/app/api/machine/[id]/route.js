import Machine from "@/app/models/machine";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const foundMachine = await Machine.findOne({ _id: id });
  return NextResponse.json({ foundMachine }, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    console.log("update dfjksdfa");
    const { id } = params;
    const body = await req.json();
    console.log(body);
    const updatedMachineData = await Machine.findByIdAndUpdate(id, {
      ...body.formData,
    });
    return NextResponse.json({ success: true, data: updatedMachineData });
  } catch (err) {
    // Handle errors
    console.error(err);
    return NextResponse.json({ success: false, error: "Server Error" });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await Machine.findByIdAndDelete(id);
    return NextResponse.json({ message: "Machine Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
