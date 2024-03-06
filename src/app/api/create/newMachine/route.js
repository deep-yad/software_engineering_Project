import Machine from "@/models/machine";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    // const { machine_name, description, total_quantity, subpart } = await request.json();
    try {
        const con = await connectToDB();
        console.log("connected");
        const newMachine = new Machine({
          machine_id: 12,
          machine_name: "xyz",
          description: "machine",
          total_quatity: 1,
          available_quantity: 1,
          subpart: [
            { subpart_name: "x", subpart_available_quantity: 1 },
            { subpart_name: "x", subpart_available_quantity: 1 },
            ],
            current: [0],
          completed:[1]
        });
        await newMachine.save();
        return new Response(JSON.stringify(newMachine), { status: 201 });
        
    } catch (error) {
        return new Response("Error Occured while saving NEW MACHINE", { status: 500 });
    }
};
