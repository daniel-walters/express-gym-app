import { app } from "../../src/app.js";
import request from "supertest";
import Event from "../../src/db/models/event";
import { deleteEvent } from "../../src/Events/eventFunctions.js";

// connect and use test db
import mongoose from "../../src/db/index.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/test-gym-db");
});

afterAll(async () => {
  await mongoose.disconnect();
});


describe("Event Routes", () => {
    let id;

    afterEach(async () => {
        await deleteEvent(id);
  });

    test("GET /events -> should respond with statusCode 200 and get an array of all events objects with correct information", async () => {
        let event = await Event.create({
            name: "Test challenge", 
            description: "this is a test",
            startTime: new Date(2021, 12, 13),
            endTime:new Date(2021, 12, 14),
            registeredUsers:["6188d363ee05ab76027553cf", "6200d363ee05ab76027553ee"],
            spotsAvailable: 20,
            eventImage: null,
            category: 'Competition',
            createdBy: "61be9b2af76e3e4a461b7040"
        })
        event = JSON.parse(JSON.stringify(event));
        
        id = event._id
        const events = await Event.find({});

        await request(app)
        .get("/events")
        .expect(200)
        .then((response) => {

            // Check the response type and length
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(events.length);

            // Check the response data
            expect(response.body[events.length - 1]._id).toBe(id);
            expect(response.body[events.length - 1].description).toBe(event.description);
            expect(response.body[events.length - 1].startTime).toBe(event.startTime);
            expect(response.body[events.length - 1].endTime).toBe(event.endTime);
            expect(response.body[events.length - 1].registeredUsers).toEqual(event.registeredUsers);
            expect(response.body[events.length - 1].spotsAvailable).toBe(event.spotsAvailable);
            expect(response.body[events.length - 1].category).toBe(event.category);
            expect(response.body[events.length - 1].createdBy).toBe(event.createdBy);
        })
    })

    test("GET /events/:id -> should respond with statusCode 201 and get correct event values, including createdBy populated from profile", async () => {
        let event = await Event.create({
            name: "Test challenge", 
            description: "this is a GET by id test",
            startTime: new Date(2021, 12, 13),
            endTime:new Date(2021, 12, 14),
            registeredUsers:["6188d363ee05ab76027553cf", "6200d363ee05ab76027553ee"],
            spotsAvailable: 20,
            eventImage: null,
            category: 'Competition',
            createdBy: "61db8b067928faf57f4678fa"
        });

        event = JSON.parse(JSON.stringify(event));
        id = event._id;
        await request(app)
        .get("/events/" + id)
        .expect(201)
        .then((response) => {
            expect(response.body._id).toBe(id);
            expect(response.body.name).toBe(event.name);
            expect(response.body.description).toBe(event.description);
            expect(response.body.startTime).toBe(event.startTime);
            expect(response.body.endTime).toBe(event.endTime);
            expect(response.body.registeredUsers).toEqual(event.registeredUsers);
            expect(response.body.spotsAvailable).toBe(event.spotsAvailable);
            expect(response.body.category).toBe(event.category);
            expect(response.body.createdBy._id).toBe(event.createdBy);
            expect(response.body.createdBy.firstName).toBe('Test');
            expect(response.body.createdBy.lastName).toBe('User');
        })
    })

    test("POST/events -> should respond with statusCode 201 and add new event with correct values", async () => {
        let event = {
            name: "Test challenge", 
            description: "this is a POST request test",
            startTime: new Date(2021, 12, 13),
            endTime:new Date(2021, 12, 14),
            registeredUsers: null,
            spotsAvailable: 20,
            eventImage: null,
            category: 'Competition', 
            createdBy: "61be9b2af76e3e4a461b7040"
        };

        await request(app)
        .post("/events")
        .send(event)
        .expect(201)
        .then(async (response) => {
            let event = await Event.findOne({ _id: response.body._id });

            event = JSON.parse(JSON.stringify(event));
            id = response.body._id;

            // Check the response
            expect(response.body._id).toBeTruthy();
            expect(response.body.name).toBe(event.name);
            expect(response.body.description).toBe(event.description);
            expect(response.body.startTime).toBe(event.startTime);
            expect(response.body.endTime).toBe(event.endTime);
            expect(response.body.registeredUsers).toEqual(event.registeredUsers);
            expect(response.body.spotsAvailable).toBe(event.spotsAvailable);
            expect(response.body.eventImage).toBe(event.eventImage);
            expect(response.body.category).toBe(event.category); 
            expect(response.body.createdBy).toBe(event.createdBy);   
        })
    })

    test("PUT /event/:id -> should respond with statusCode 200 and update existing event", async () => {
        let event = await Event.create({
            name: "Test challenge", 
            description: "this is a PUT request test",
            startTime: new Date(2021, 12, 13),
            endTime:new Date(2021, 12, 14),
            registeredUsers:["6188d363ee05ab76027553cf", "6200d363ee05ab76027553ee"],
            spotsAvailable: 20,
            eventImage: null,
            category: 'Competition',
            createdBy: "61be9b2af76e3e4a461b7040"
        });
        event = JSON.parse(JSON.stringify(event));
        id = event._id;

        let updatedEvent = {
            name: "Updated test challenge", 
            description: "this is a PUT request test",
            startTime: new Date(2021, 12, 14),
            endTime:new Date(2021, 12, 15),
            registeredUsers:["6188d363ee05ab76027553cf", "6200d363ee05ab76027553ee", "6200d363ee05ab76923663ff"],
            spotsAvailable: 15,
            eventImage: null,
            category: 'Competition',
            createdBy: "61be9b2af76e3e4a461b7040"
        }

        updatedEvent = JSON.parse(JSON.stringify(updatedEvent));

        await request(app)
        .put("/events/" + id)
        .send(updatedEvent )
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body._id).toBe(event._id);
            expect(response.body.name).toBe(updatedEvent.name);
            expect(response.body.description).toBe(updatedEvent.description);
            expect(response.body.startTime).toBe(updatedEvent.startTime);
            expect(response.body.endTime).toBe(updatedEvent.endTime);
            expect(response.body.registeredUsers).toEqual(updatedEvent.registeredUsers);
            expect(response.body.spotsAvailable).toBe(updatedEvent.spotsAvailable);
            expect(response.body.eventImage).toBe(updatedEvent.eventImage);
            expect(response.body.category).toBe(updatedEvent.category);
            expect(response.body.createdBy).toBe(updatedEvent.createdBy);


            // Check the data in the database
            let updatedData = await Event.findOne({_id: response.body._id});
            updatedData = JSON.parse(JSON.stringify(updatedData));
            expect(updatedData._id).toBeTruthy();
            expect(updatedData.name).toBe(updatedEvent.name);
            expect(updatedData.description).toBe(updatedEvent.description);
            expect(updatedData.startTime).toBe(updatedEvent.startTime);
            expect(updatedData.endTime).toBe(updatedEvent.endTime);
            expect(updatedData.registeredUsers).toEqual(updatedEvent.registeredUsers);
            expect(updatedData.spotsAvailable).toBe(updatedEvent.spotsAvailable);
            expect(updatedData.eventImage).toBe(updatedEvent.eventImage);
            expect(updatedData.category).toBe(updatedEvent.category);
        })
    })

    test("DELETE /events/:id -> should delete the event with correct id", async () => {
        let event = await Event.create({
            name: "Test challenge", 
            description: "this is a Delete request test",
            startTime: new Date(2021, 12, 13),
            endTime:new Date(2021, 12, 14),
            registeredUsers:["6188d363ee05ab76027553cf", "6200d363ee05ab76027553ee"],
            spotsAvailable: 15,
            eventImage: null,
            category: 'Class',
            createdBy: "61be9b2af76e3e4a461b7040"
        });

        id = event._id;

        await request(app)
        .delete("/events/" + id)
        .expect(200)
        .then(async () => {
        expect(await Event.findOne({ _id: id })).toBeFalsy();
      });
    })
})