const fs = require("fs");
const path = require("path");

console.log(path.join(__dirname, "test.txt"));
const filePath = path.join(__dirname, "test.txt");
fs.writeFileSync(filePath, new Uint8Array(Buffer.from("Hello Node.js")));