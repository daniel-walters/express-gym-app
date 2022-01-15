import event from "../../src/db/models/event.js";
// connect and use test db
import mongoose from "../../src/db/index.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/test-gym-db");
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("event model", () => {
  test("should allow 'Personal Training', 'Class', 'Competition'", async () => {
    //add required field name, startTime, endTime, createdBy to test model to pass tests.
    let trainingEvent = await event.create({
      name:"event test",
      category: "Personal Training",
      startTime: new Date(2023, 12, 13),
      endTime: new Date(2023, 12, 14),
      createdBy: "61be9b2af76e3e4a461b7040",
    });
    expect(trainingEvent.category).toBe("Personal Training");
    let compEvent = await event.create({
      name:"event test",
      category: "Competition",
      startTime: new Date(2023, 12, 13),
      endTime: new Date(2023, 12, 14),
      createdBy: "61be9b2af76e3e4a461b7040",
    });
    expect(compEvent.category).toBe("Competition");
    let classEvent = await event.create({
      name:"event test",
      category: "Class",
      startTime: new Date(2023, 12, 13),
      endTime: new Date(2023, 12, 14),
      createdBy: "61be9b2af76e3e4a461b7040",
    });
    expect(classEvent.category).toBe("Class");
  });
});
