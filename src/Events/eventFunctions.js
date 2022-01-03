import Event from '../db/models/event.js';

//get all events
export async function getAllEvents(){
    let events = await Event.find();
    return events
}

//get event by id
export async function getEventById(id){
    let event = await Event.findById({_id: id}).populate({path: 'createdBy', select: ['firstName', 'lastName']})
    return event
}


//create an event
export async function createEvent(details){
    let newEvent = new Event({
        name: details.name, 
        description: details.description,
        startTime: details.startTime,
        endTime:details.endTime,
        registeredUsers:details.registeredUsers,
        spotsAvailable: details.spotsAvailable,
        createdBy: details.createdBy,
        eventImage: details.eventImage,
        category: details.category    
    })

    let result = await newEvent.save();
    return result
}

//update an event by id
export async function updateEventById(id, details){
    const updatedEventDetails = {
        name: details.name, 
        description: details.description,
        startTime: details.startTime,
        endTime:details.endTime,
        registeredUsers:details.registeredUsers,
        spotsAvailable: details.spotsAvailable,
        createdBy: details.createdBy,
        eventImage: details.eventImage,
        category: details.category    
    }
    let updatedEvent = await Event.findByIdAndUpdate(id, updatedEventDetails, { new: true })
    return updatedEvent
}


export async function deleteEvent(id) {
    let event = await Event.deleteOne({ _id: id });
    return event
};