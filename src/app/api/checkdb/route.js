import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const con = await connectToDB();

    const Cat = con.model("Cat", { name: String });
    const kitty = new Cat({ name: "Zildjian" });
    kitty.save().then(() => console.log("meow"));

    return new NextResponse("connected");
  } catch (error) {
    console.log("NOT COnnected................"); 
    return new NextResponse('not connected');
  }
}
