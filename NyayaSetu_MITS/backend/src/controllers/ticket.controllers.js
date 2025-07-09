import Ticket from "../models/ticket.models.js";
import User from "../models/user.models.js";
import { allocatePriority } from "../utils/sentiment.js";
// import  generateAndSendComplaintPDF  from "../utils/generateAndSendComplaintPDF.js";
const createTicket = async (req, res) => {
    try {
        
       const userId = req.userId
       console.log(userId);
       
        console.log(req.body);
         
        if(req.userId=='anonymous'){ 
            userType='anonymous',
            owner="64b7f294f1a2c1aaf0c2e76b"
        }

        
        const {
            title,
            description,
            email,
            city,
            state,
            category,
            contactNumber
        } = req.body;

        const sentiment=await allocatePriority(description)
        const priority=sentiment.reason.split(" ")[3]
        const ticketData = {
            title,
            description,
            email,
            contactNumber,
            location:{city,state},
            category,
            priority,
            userType,
            owner:owner
        };

        const ticket = new Ticket(ticketData);
        await ticket.save();
        console.log("Ticket Created Success fully");
        
        if(req.userId!='anonymous'){
        const user = await User.findById(userId).select('name email');
        await generateAndSendComplaintPDF(user, ticket);
        }

        return res.status(201).json({
            message: "Ticket created successfully and PDF emailed if loggedin.",
            ticket,
        });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return res.status(400).json({ message: "Failed to create ticket", error });
    }
};

const getUserTickets = async (req, res) => {
    try {
        const userId = req.userId;

        const tickets = await Ticket.find({ owner: userId });

        return res.status(200).json({
            message: "Tickets fetched successfully",
            tickets,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tickets", error });
    }
};

export { createTicket, getUserTickets };