const fileService = require("./fileService");

const mockFileInputString1 = "Hello, World!";
const mockExpectedResponseWithInput1 = {
  wordCount: 2,
  letterCount: 12,
  symbolCount: 2,
  topThreeWords: [
    { word: "Hello,", count: 1 },
    { word: "World!", count: 1 },
  ],
  topThreeLetters: [
    { letter: "l", count: 3 },
    { letter: "o", count: 2 },
    { letter: "H", count: 1 },
  ],
};

const mockFileInputString2 = "Hello, World! Hello, World!";
const mockExpectedResponseWithInput2 = {
  wordCount: 4,
  letterCount: 24,
  symbolCount: 4,
  topThreeWords: [
    { word: "Hello,", count: 2 },
    { word: "World!", count: 2 },
  ],
  topThreeLetters: [
    { letter: "l", count: 6 },
    { letter: "o", count: 4 },
    { letter: "H", count: 2 },
  ],
};

const mockFileInputString3 = "Hello, World! Hello, World! Hello, World!";
const mockExpectedResponseWithInput3 = {
  wordCount: 6,
  letterCount: 36,
  symbolCount: 6,
  topThreeWords: [
    { word: "Hello,", count: 3 },
    { word: "World!", count: 3 },
  ],
  topThreeLetters: [
    { letter: "l", count: 9 },
    { letter: "o", count: 6 },
    { letter: "H", count: 3 },
  ],
};

const mockFileInputString4 =
  " a a a a a a a a Hello, World! Hello, Hello, Hello! Sample Test Sample Test Sample TestSample";

const expectedResponseWithNullInput = {
  wordCount: 0,
  letterCount: 0,
  symbolCount: 0,
  topThreeWords: [],
  topThreeLetters: [],
};

describe("fileService", () => {
  it("should have textStatistics function", () => {
    expect(typeof fileService.textStatistics).toEqual("function");
  });

  describe("statistics", () => {
    it("should return null statistics with empty string input", () => {
      const response = fileService.textStatistics("");
      expect(response).toEqual(expectedResponseWithNullInput);
    });

    it("should return null statistics with null input", () => {
      const response = fileService.textStatistics(null);
      expect(response).toEqual(expectedResponseWithNullInput);
    });

    it("should match statistics with mockFileInputString1 input", () => {
      const response = fileService.textStatistics(mockFileInputString1);
      expect(response).toEqual(mockExpectedResponseWithInput1);
    });

    it("should match statistics with mockFileInputString2 input", () => {
      const response = fileService.textStatistics(mockFileInputString2);
      expect(response).toEqual(mockExpectedResponseWithInput2);
    });

    it("should match statistics with mockFileInputString3 input", () => {
      const response = fileService.textStatistics(mockFileInputString3);
      expect(response).toEqual(mockExpectedResponseWithInput3);
    });
  });

  it("should have topCommonWords function", () => {
    expect(typeof fileService.topCommonWords).toEqual("function");
  });

  describe("topCommonWords", () => {
    it("should return empty array with empty input", () => {
      const response = fileService.topCommonWords("");
      expect(response).toEqual([]);
    });

    it("should return word count for mockFileInputString1 input", () => {
      const response = fileService.topCommonWords(mockFileInputString1);
      const expectedResponse = [
        { word: "Hello,", count: 1 },
        { word: "World!", count: 1 },
      ];
      expect(response).toEqual(expectedResponse);
    });

    it("should return word count for mockFileInputString2 input", () => {
      const response = fileService.topCommonWords(mockFileInputString2);
      const expectedResponse = [
        { word: "Hello,", count: 2 },
        { word: "World!", count: 2 },
      ];
      expect(response).toEqual(expectedResponse);
    });

    it("should return single word count for mockFileInputString2 input with number info is 1", () => {
      const response = fileService.topCommonWords(mockFileInputString2, 1);
      const expectedResponse = [{ word: "Hello,", count: 2 }];
      expect(response).toEqual(expectedResponse);
    });

    it("should return word count for mockFileInputString4 input", () => {
      const response = fileService.topCommonWords(mockFileInputString4);

      const expectedResponse = [
        { word: "a", count: 8 },
        { word: "Hello,", count: 3 },
        { word: "Sample", count: 3 },
      ];
      expect(response).toEqual(expectedResponse);
    });

    it("should return word count for mockFileInputString4 input for 5 words", () => {
      const response = fileService.topCommonWords(mockFileInputString4, 5);

      const expectedResponse = [
        { word: "a", count: 8 },
        { word: "Hello,", count: 3 },
        { word: "Sample", count: 3 },
        { word: "Test", count: 2 },
        { word: "World!", count: 1 },
      ];
      expect(response).toEqual(expectedResponse);
    });
  });

  it("should have topCommonLetters function", () => {
    expect(typeof fileService.topCommonLetters).toEqual("function");
  });

  describe("topCommonLetters", () => {
    it("should return empty with empty input", () => {
      const response = fileService.topCommonLetters("");
      expect(response).toEqual([]);
    });

    it("should return letter count for mockFileInputString1 input", () => {
      const response = fileService.topCommonLetters(mockFileInputString1);
      const expectedResponse = [
        { letter: "l", count: 3 },
        { letter: "o", count: 2 },
        { letter: "H", count: 1 },
      ];
      expect(response).toEqual(expectedResponse);
    });

    it("should return letter count for mockFileInputString2 input", () => {
      const response = fileService.topCommonLetters(mockFileInputString2);

      const expectedResponse = [
        { letter: "l", count: 6 },
        { letter: "o", count: 4 },
        { letter: "H", count: 2 },
      ];
      expect(response).toEqual(expectedResponse);
    });

    it("should return single letter count for mockFileInputString2 input with number info is 1", () => {
      const response = fileService.topCommonLetters(mockFileInputString2, 1);

      const expectedResponse = [{ letter: "l", count: 6 }];
      expect(response).toEqual(expectedResponse);
    });

    it("should return letter count for mockFileInputString4 input", () => {
      const response = fileService.topCommonLetters(mockFileInputString4);

      const expectedResponse = [
        { letter: "l", count: 13 },
        { letter: "a", count: 12 },
        { letter: "e", count: 11 },
      ];
      expect(response).toEqual(expectedResponse);
    });

    it("should return letter count for mockFileInputString4 input for 5 words", () => {
      const response = fileService.topCommonLetters(mockFileInputString4, 5);

      const expectedResponse = [
        { letter: "l", count: 13 },
        { letter: "a", count: 12 },
        { letter: "e", count: 11 },
        { letter: "o", count: 5 },
        { letter: "H", count: 4 },
      ];
      expect(response).toEqual(expectedResponse);
    });
  });
});
