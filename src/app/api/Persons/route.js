import Person from "@/app/models/person";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const persons = await Person.find();
    //console.log(persons);
    return Response.json(persons);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    console.log("lol");
    const body = await req.json();
    console.log("problem");
    const personData = body.formData;

    await Person.create(personData);

    return NextResponse.json({ message: "person Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
