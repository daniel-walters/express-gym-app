import { app } from "../../src/app.js";
import request from "supertest";
import Report from "../../src/db/models/report";
import { deleteReport } from "../../src/Reports/reportFunctions.js";
import { nullOrAny } from "../../src/utils/util-functions";

// connect and use test db
import mongoose from "../../src/db/index.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/test-gym-db");
});

afterAll(async () => {
  await mongoose.disconnect();
});

// add customised matcher to jest
expect.extend({
  nullOrAny,
});

describe("Report Routes", () => {
  let id;

  afterEach(async () => {
    await deleteReport(id);
  });

  test("GET /reports -> should respond with statusCode 200 and get all reports", async () => {
    let report = await Report.create({
      type: "Faulty Equipment",
      userId:"6CdKUz1NouR9gG4BPqlsePv2V0e2",
      description: "I break the barbell",
      reportImage: null,
    });
    // convert to JSON object
    report = JSON.parse(JSON.stringify(report));

    id = report._id;
    const reports = await Report.find({});

    await request(app)
      .get("/reports")
      .expect(200)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(reports.length);

        // Check the response data
        expect(response.body[reports.length - 1]._id).toBe(id);
        expect(response.body[reports.length - 1].type).toBe(report.type);
        expect(response.body[reports.length - 1].userId).toBe(report.userId);
        expect(response.body[reports.length - 1].description).toBe(report.description);
        expect(response.body[reports.length - 1].resolved).toBe(report.resolved);
        expect(response.body[reports.length - 1].resolvedBy).toBe(report.resolvedBy);
        expect(response.body[reports.length - 1].reportDate).toBe(report.reportDate);
        expect(response.body[reports.length - 1].reportImage).toBe(report.reportImage);
      });
  });

  test("GET /reports/:id -> should respond with statusCode 201 and get correct values", async () => {
    let report = await Report.create({
      type: "Faulty Equipment",
      description: "test for get by id request",
      userId:"6CdKUz1NouR9gG4BPqlsePv2V0e2",
      reportImage: null,
    });
    id = report._id;

    report = JSON.parse(JSON.stringify(report));

    await request(app)
      .get("/reports/" + id)
      .expect(201)
      .then((response) => {
        expect(response.body._id).toBe(report._id);
        expect(response.body.type).toBe(report.type);
        expect(response.body.description).toBe(report.description);
        expect(response.body.resolved).toBe(report.resolved);
        expect(response.body.reportDate).toBe(report.reportDate);
        expect(response.body.reportImage).toBe(report.reportImage);
      });
  });

  test("POST/reports -> should respond with statusCode 201 and add new report with id, type, description, resolved, reportImage", async () => {
    let report = {
      type: "Faulty Equipment",
      description: "test for post request",
      userId:"6CdKUz1NouR9gG4BPqlsePv2V0e2",
      reportImage: null,
    };

    await request(app)
      .post("/reports")
      .send(report)
      .expect(201)
      .then(async (response) => {
        let report = await Report.findOne({ _id: response.body._id });
        report = JSON.parse(JSON.stringify(report));

        id = response.body._id;
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.type).toBe(report.type);
        expect(response.body.description).toBe(report.description);
        expect(response.body.resolved).toBe(report.resolved);
        expect(response.body.reportDate).toBe(report.reportDate);
        expect(response.body.reportImage).toBe(report.reportImage);
      });
    });

    test("PUT /report/:id -> should respond with statusCode 200 and update existing repot", async () => {
      let report = await Report.create({
        type: "Faulty Equipment",
        userId:"6CdKUz1NouR9gG4BPqlsePv2V0e2",
        description: "test for put request",
        reportImage: null
      });
      id = report._id;
      report = JSON.parse(JSON.stringify(report));

      let data = {
        type: "Unsocial Behaviour",
        description: "updated description",
        userId:"6CdKUz1NouR9gG4BPqlsePv2V0e2",
        resolved: true,
        resolvedBy:"123",
        reportDate: new Date(),
        reportImage: null
      };
      data = JSON.parse(JSON.stringify(data));

      await request(app)
        .put("/reports/" + id)
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBe(report._id);
          expect(response.body.type).toBe(data.type);
          expect(response.body.userId).toBe(report.userId);
          expect(response.body.description).toBe(data.description);
          expect(response.body.resolved).toBe(data.resolved);
          expect(response.body.resolvedBy).toBe(data.resolvedBy);
          expect(response.body.reportDate).toBe(data.reportDate);
          expect(response.body.reportImage).toBe(data.reportImage);

          // Check the data in the database
          let updatedReport = await Report.findOne({_id: response.body._id});
          updatedReport = JSON.parse(JSON.stringify(updatedReport));
          expect(updatedReport._id).toBeTruthy();
          expect(updatedReport.type).toBe(data.type);
          expect(updatedReport.userId).toBe(data.userId);
          expect(updatedReport.description).toBe(data.description);
          expect(updatedReport.resolved).toBe(data.resolved);
          expect(updatedReport.resolvedBy).toBe(data.resolvedBy);
          expect(updatedReport.reportDate).toBe(data.reportDate);
          expect(updatedReport.reportImage).toBe(data.reportImage);
        });
    });

  test("DELETE /reports/:id -> should delete the report with correct id", async () => {
    const report = await Report.create({
      type: "Unsocial Behaviour",
      userId:"6CdKUz1NouR9gG4BPqlsePv2V0e2",
      description: "test for delete request",
      reportImage: null,
    });

    id = report._id;

    await request(app)
      .delete("/reports/" + id)
      .expect(200)
      .then(async () => {
        expect(await Report.findOne({ _id: id })).toBeFalsy();
      });
  });
});
