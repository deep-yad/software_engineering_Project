import Issue from "@/app/models/issue";
import { NextResponse } from "next/server";
export const dynamic = "force-static";
import Person from "@/app/models/person";
import Machine from "@/app/models/machine";
export async function GET() {
  try {
    const issues = await Issue.find();
    return NextResponse.json({ issues }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    console.log("lol");
    const body = await req.json();
    console.log("problem");
    const issueData = body.formData;
    console.log(issueData);
    await Issue.create(issueData);
    const myObj = await Issue.find(issueData);
    console.log(myObj);
    const issue_id = myObj[0]._id.toString();
    const person_id = myObj[0].person_id.toString();
    const machine_id = myObj[0].machine_id.toString();
    console.log(issue_id);
    console.log(person_id);
    console.log(machine_id);

    const babu = await Person.findOne({ "_id": person_id });
    console.log(babu);
    babu.current.push(issue_id);
    await Person.replaceOne({ "_id": person_id }, babu);
    console.log(babu);

    const machine = await Machine.findOne({ _id: machine_id });
    console.log(machine);
    machine.current.push(issue_id);
    await Machine.replaceOne({ _id: machine_id }, machine);
    console.log(machine);




    return NextResponse.json({ message: "issue Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
