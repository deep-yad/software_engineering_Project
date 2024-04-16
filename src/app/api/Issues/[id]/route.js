import Issue from "@/app/models/issue";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const foundIssue = await Issue.findOne({ _id: id });
  return NextResponse.json({ foundIssue }, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    console.log("my guy");
    const { id } = params;

    const body = await req.json();
    const issueData = body.formData;

    const updateIssueData = await Issue.findByIdAndUpdate(id, {
      ...issueData,
    });

    return NextResponse.json({ message: "issue updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await Issue.findByIdAndDelete(id);
    return NextResponse.json({ message: "Issue Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
