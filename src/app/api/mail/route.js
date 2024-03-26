import nodemailer from "nodemailer";
import Person from "@/app/models/person";
import Issue from "@/app/models/issue";
import { NextResponse } from "next/server";
export const dynamic = "force-static";

export async function POST(req) {

    const {userId, issueId} = await req.json();
    console.log(userId);
    console.log(issueId);
    const user = await Person.findById(userId);
    const issue = await Issue.findById(issueId);
    console.log(user);
    console.log(issue);

    const transporter = nodemailer.createTransport({
    service:"gmail",
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
        name:"Deepak",
        address:"yadavluckyxyz@gmail.com"
      },
      to: "deepak2604yadav@gmail.com",
      subject: 'Regarding Due Date of Issued Machine',
      text: `Dear ${user.person_name},
      You have issued the following equipment with ID ${3452452234} from maker Space lab . Your due date is  "12/32423/224".
      From : Anand Petare, Maker Space Lab , IIt Indore
      Best Regards
    `,
    };
    const sendMail =async (transporter,mailOptions)=>{
        try{
            await transporter.sendMail(mailOptions);
            console.log("email sent successfully");
        } catch(e){
            console.log(e);
        }
    }
    sendMail(transporter, mailOptions);
    // transporter.sendMail(mailOptions).then(() => { console.log("MAIL SEND SUCCESFULLY") })
  }