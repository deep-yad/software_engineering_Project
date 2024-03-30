import Person from "@/app/models/person";
import { NextResponse } from "next/server";
export const dynamic = "force-static";

export async function PUT(req, res) {
  try {
    console.log("okkkkkkkkkkk");
    const { userId, issueId } = await req.json();
    console.log(issueId);
    const person = await Person.findById(userId);
    if (!person) {
      return NextResponse.json(
        { message: "person not found" },
        { status: 500 }
      );
    }
    console.log(person.current);
    const currentIssueIndex = person.current.findIndex(
      (item) => item._id.toString() === issueId.toString()
    );
    console.log(currentIssueIndex);
    if (currentIssueIndex === -1) {
      return NextResponse.json({ message: "issue not found" }, { status: 500 });
    }
    // const currentIssueIndex=0;
    const movedIssue = person.current.splice(currentIssueIndex, 1)[0];
    person.completed.push(movedIssue);
    console.log(person.completed);

    await person.save();

    return NextResponse.json(
      { message: "Issue moved to completed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
