const Sanscript = require('@sanskrit-coders/sanscript');
const fs = require('fs');

const nepaliWordsData = require('../data/nepaliWords.json');
const processedData = {
  words: nepaliWordsData.nepaliWords.map(word => ({
    devanagari: word,
    romanized: Sanscript.t(word, "devanagari", "itrans").toLowerCase()
  }))
};

fs.writeFileSync('./data/preprocessedNepaliWords.json', JSON.stringify(processedData));