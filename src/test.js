const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'test.json'), '运行成功');