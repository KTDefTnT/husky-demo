const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "test.txt");
console.log(filePath);


fs.writeFileSync(filePath, new Uint8Array(Buffer.from("Hello Node.js")));