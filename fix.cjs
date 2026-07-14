const fs = require('fs');
let code = fs.readFileSync('src/lib/api.ts', 'utf8');
code = code.replace(/await connectDB\(\);\s*const mongoose = \(await import\("mongoose"\)\)\.default;/g, 'await connectDB();\n    const models = await import("../lib/models");\n    const mongoose = (await import("mongoose")).default;');
code = code.replace(/mongoose\.models\./g, 'models.');
fs.writeFileSync('src/lib/api.ts', code);
