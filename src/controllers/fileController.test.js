const fileController = require("./fileController");

describe("File Controller", () => {
  it("should have statistics function", () => {
    expect(typeof fileController.statistics).toEqual("function");
  });

  it("should have fileUpload function", () => {
    expect(typeof fileController.fileUpload).toEqual("function");
  });
});
