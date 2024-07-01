const request = require("supertest");
const path = require("path");
const app = require("../../index");

const testFilePath = "../../testFiles/PingIdentity-Assignment.txt";
const testFilePath1 = "../../testFiles/PingIdentity-Assignment.jpeg";
const testFilePath2 = "../../testFiles/PingIdentity-Assignment.json";
const testFilePath3 = "../../testFiles/PingIdentity-Assignment-large.txt";

describe("File Stats API", () => {
  it("should throw 400 when no file provided", async () => {
    const response = await request(app).post("/api/v1/files/stats");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "File not found." });
  });

  it("should return statistics data for text file", async () => {
    try {
      const expectedResponse = {
        status: "success",
        data: {
          wordCount: 230,
          letterCount: 1169,
          symbolCount: 51,
          topThreeWords: [
            {
              word: "and",
              count: 10,
            },
            {
              word: "the",
              count: 10,
            },
            {
              word: "file",
              count: 8,
            },
          ],
          topThreeLetters: [
            {
              letter: "e",
              count: 124,
            },
            {
              letter: "t",
              count: 117,
            },
            {
              letter: "i",
              count: 87,
            },
          ],
        },
      };
      const response = await request(app)
        .post("/api/v1/files/stats")
        .attach("file", path.resolve(__dirname, testFilePath));

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    } catch (error) {
      console.log("error --->>>>", error);
      expect(error).toBeDefined();
    }
  });

  it("should throw error for file type for jpeg file", async () => {
    let isErrored = false;
    let response;
    try {
      response = await request(app)
        .post("/api/v1/files/stats")
        .attach("file", path.resolve(__dirname, testFilePath1));
    } catch (error) {
      isErrored = true;
      console.log("error --->>>>", error);
    }
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "This type of file not allowed. Please select text file.",
    });
    expect(isErrored).toBeFalsy();
  });

  it("should throw error for file type for json file", async () => {
    let isErrored = false;
    let response;
    try {
      response = await request(app)
        .post("/api/v1/files/stats")
        .attach("file", path.resolve(__dirname, testFilePath2));
    } catch (error) {
      isErrored = true;
      console.log("error --->>>>", error);
    }
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "This type of file not allowed. Please select text file.",
    });
    expect(isErrored).toBeFalsy();
  });

  it("should throw error for file more than 2KB size", async () => {
    let isErrored = false;
    let response;
    try {
      response = await request(app)
        .post("/api/v1/files/stats")
        .attach("file", path.resolve(__dirname, testFilePath3));
    } catch (error) {
      isErrored = true;
      console.log("error --->>>>", error);
    }
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "File size should be less than 2 KB.",
    });
    expect(isErrored).toBeFalsy();
  });

  it("should throw error for multiple files", async () => {
    let isErrored = false;
    let response;
    try {
      response = await request(app)
        .post("/api/v1/files/stats")
        .attach("file", path.resolve(__dirname, testFilePath))
        .attach("file", path.resolve(__dirname, testFilePath2));
    } catch (error) {
      isErrored = true;
      console.log("error --->>>>", error);
    }
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Multiple files not allowed. Please select only one file.",
    });
    expect(isErrored).toBeFalsy();
  });
});
