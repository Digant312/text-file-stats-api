const fileController = require("./fileController");

describe("File Controller", () => {
  const mockRequest = {
    body: {
      file: {
        buffer: Buffer.from("Hello, World!"),
        mimetype: "text/plain",
        size: 1000,
      },
    },
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  jest.mock("multer", () => {
    const multer = {
      single: jest.fn().mockReturnThis(),
    };
    return multer;
  });

  it("should have statistics function", () => {
    expect(typeof fileController.statistics).toEqual("function");
  });

  it("should have fileUpload function", () => {
    expect(typeof fileController.fileUpload).toEqual("function");
  });

  // it.only("fileUpload function should return statistics of file", async () => {
  //   await fileController.fileUpload(
  //     mockRequest,
  //     mockResponse,
  //     function (mockRequest, mockResponse) {
  //       console.log(mockResponse.status);
  //     }
  //   );
  //   console.log(mockResponse.json);
  //   console.log(mockRequest);
  //   expect(mockResponse.status).toHaveBeenCalledWith(200);
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     wordCount: 3,
  //     characterCount: 13,
  //     lineCount: 1,
  //   });
  // });
});
