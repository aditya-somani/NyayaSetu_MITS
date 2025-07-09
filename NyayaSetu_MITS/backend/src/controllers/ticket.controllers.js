import { log } from "console";
import Ticket from "../models/ticket.models.js";
import User from "../models/user.models.js";
import { allocatePriority } from "../utils/sentiment.js";
// import  generateAndSendComplaintPDF  from "../utils/generateAndSendComplaintPDF.js";
const createTicket = async (req, res) => {
    try {
        
       const userId = req.userId
       console.log(userId);
       
        console.log(req.body);
         
       if (req.userId === 'anonymous') {
        var userType = 'anonymous';
        var owner = '64b7f294f1a2c1aaf0c2e76b';
    }
        const {
            title,
            description,
            email,
            city,
            state,
            category,
            contactNumber
        } = req.body.formData;

         const complaintNo=req.body.complaintdetail
        const sentiment=await allocatePriority(description)
        console.log(sentiment);
        
        const priority=sentiment?.reason.split(" ")[3]

        const ticketData = {
            title,
            description,
            email,
            contactNumber,
            location:{city,state},
            category,
            priority,
            userType,
            owner:owner,
            complaintNo
        };

        const ticket = new Ticket(ticketData);
        await ticket.save();
        console.log("Ticket Created Successfully");
        
        

        return res.status(201).json({
            message: "Ticket created successfully and PDF emailed if loggedin.",
            ticket,
        });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return res.status(400).json({ message: "Failed to create ticket", error });
    }
};



const trackComplaint=async(req,res)=>{
    try {
        const trackNo=req.params.trackNo
        console.log(trackNo);
        

        const result=await Ticket.find({
            complaintNo:trackNo
        })

        console.log(result);
        return res.json(result)
    } catch (error) {
        return res.json("Cannot Find Complaint",error)
    }
}

export { createTicket, trackComplaint };