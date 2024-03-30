import Issue from "@/app/models/issue";
import { NextResponse } from "next/server";
export const dynamic = "force-static";

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
    const issueData = body.new_Item;
      console.log("++",issueData);
    await Issue.create(issueData);
    

    return NextResponse.json({ message: "issue Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
