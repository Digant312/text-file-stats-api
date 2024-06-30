const textStatistics = function (text) {
  if (text.length === 0)
    return {
      wordCount: 0,
      letterCount: 0,
      symbolCount: 0,
      topThreeWords: [],
      topThreeLetters: [],
    };

  const topThreeWords = topCommonWords(text, 3);
  const topThreeLetters = topCommonLetters(text, 3);
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const letters = text.replace(/\s+/g, "");
  const letterCount = letters ? letters.length : 0;

  const symbols = text.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g);
  const symbolCount = symbols ? symbols.length : 0;

  return {
    wordCount,
    letterCount,
    symbolCount,
    topThreeWords,
    topThreeLetters,
  };
};

const topCommonWords = function (text, numberOfWords = 3) {
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = {};

  for (const word of words) {
    wordCount[word] = (wordCount[word] || 0) + 1;
  }

  const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);

  return sortedWords
    .slice(0, numberOfWords)
    .map(([word, count]) => ({ word, count }));
};

const topCommonLetters = function (text, numberOfLetters = 3) {
  const letters = text.replace(/\s+/g, "").split("");
  const letterCount = {};

  for (const letter of letters) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  const sortedLetters = Object.entries(letterCount).sort((a, b) => b[1] - a[1]);

  return sortedLetters
    .slice(0, numberOfLetters)
    .map(([letter, count]) => ({ letter, count }));
};

module.exports = {
  textStatistics,
};
