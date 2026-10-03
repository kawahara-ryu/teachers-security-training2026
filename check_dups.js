const fs = require('fs');

const content = fs.readFileSync('questions.js', 'utf8');
// Evaluate the array
let questionsData;
eval(content.replace('const questionsData =', 'questionsData ='));

const seen = new Set();
const duplicates = [];

for (const q of questionsData) {
  if (seen.has(q.title)) {
    duplicates.push(q.title);
  }
  seen.add(q.title);
}

console.log("Total questions:", questionsData.length);
console.log("Duplicate titles:", duplicates);
