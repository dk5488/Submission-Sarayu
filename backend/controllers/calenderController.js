import calender from '../models/calenderModel.js'

export const  createEvent=async (req,res)=>{
    console.log("request reached to backend")
    const {date,type,time}=req.body;


    try {
        const event=await  calender.create({
            date:new Date(date),
            type,
            time,
            user:req.userId

        })

        res.status(200).json({
            message:"Event Created Successfully",
            event
        })
    } catch (error) {
        console.log("Error in creating event: ",error)
        res.status(500).json({
            message:"Issue in creating event"

        })
    }
}
export const getEvents = async (req, res) => {
    try {
      const events = await calender.find({ user: req.userId });
      
      const formattedEvents = events.map(event => ({
        ...event._doc, 
        date: event.date.toISOString().split('T')[0] // format date to `YYYY-MM-DD`
      }));
  
      res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        events: formattedEvents
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const deleteEvent = async (req, res) => {
    const { eventId } = req.body; // Get eventId from the body
  
    try {
      
      const deletedEvent = await calender.findOneAndDelete({
        _id: eventId,
        user: req.userId, 
      });
  
      if (!deletedEvent) {
        return res.status(404).json({
          message: "Event not found or not authorized to delete this event",
        });
      }
  
      res.status(200).json({
        message: "Event deleted successfully",
        deletedEvent,
      });
    } catch (error) {
      console.log("Error deleting event: ", error);
      res.status(500).json({
        message: "Issue in deleting event",
      });
    }
  };

  export const updateEvent = async (req, res) => {
    const { eventId, date, type, time } = req.body; 
    try {
      
      const event = await calender.findOne({ _id: eventId, user: req.userId });
  
      if (!event) {
        return res.status(404).json({
          message: "Event not found or not authorized to update this event",
        });
      }
  
      
      event.date = new Date(date);
      event.type = type;
      event.time = time;
  
      
      const updatedEvent = await event.save();
  
      res.status(200).json({
        message: "Event updated successfully",
        updatedEvent,
      });
    } catch (error) {
      console.log("Error updating event: ", error);
      res.status(500).json({
        message: "Issue in updating event",
      });
    }
  };
  