import Person from "@/app/models/person";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const foundPerson = await Person.findOne({ _id: id });
  return NextResponse.json({ foundPerson }, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    console.log("okkkkkkkkkkk");
    const { id } = params;

    const body = await req.json();
    const personData = body.formData;
    // console.log(req.json());
    console.log(personData);
    const updatePersonData = await Person.findByIdAndUpdate(id, {
      ...personData,
    });

    return NextResponse.json({ message: "person updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await Person.findByIdAndDelete(id);
    return NextResponse.json({ message: "Person Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
