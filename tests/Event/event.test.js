import event from "../../src/db/models/event.js";
// connect and use test db 
import mongoose from "../../src/db/index.js"

beforeAll( async () => {
  await mongoose.connect('mongodb://localhost/test-gym-db');
})

afterAll(async () => {
  await mongoose.disconnect();
});

describe('event model', () => {
    test("should allow 'Personal Training', 'Class', 'Competition'", async () => {
        let trainingEvent = await event.create({category: "Personal Training"});
        expect(trainingEvent.category).toBe("Personal Training");
        let compEvent = await event.create({category: "Competition"});
        expect(compEvent.category).toBe("Competition");
        let classEvent = await event.create({category: "Class"});
        expect(classEvent.category).toBe("Class");
    });
});