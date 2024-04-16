import nodemailer from "nodemailer";
import Person from "@/app/models/person";
import Issue from "@/app/models/issue";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, issueId } = await req.json();
  console.log(userId);
  console.log(issueId);
  const user = await Person.findById(userId);
  //const issue = await Issue.findById(issueId);
  console.log(user);
  //console.log(issue);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "yadavluckyxyz@gmail.com",
      pass: "ekvhrcjiihvxymuu",
    },
  });

  let mailOptions = {
    from: {
      name: "MakerSpace Lab",
      address: "yadavluckyxyz@gmail.com",
    },
    to: user.email_id,
    subject: "Regarding Due Date of Issued Machine",
    text: `Dear ${user.person_name},
        You have issued the following equipment with ID ${issueId} from Maker Space Lab. Please return it to Maker Space Lab.
        
      From: Anand Petare,
      Maker Space Lab,
      IIT Indore
        
      Best Regards,`,
  };
  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("email sent successfully");
    } catch (e) {
      console.log(e);
    }
  };
  sendMail(transporter, mailOptions);
  // transporter.sendMail(mailOptions).then(() => { console.log("MAIL SEND SUCCESFULLY") })
}
