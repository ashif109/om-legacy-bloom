const fs = require('fs');
let code = fs.readFileSync('src/lib/api.ts', 'utf-8');

// Remove top-level imports
code = code.replace(/import \{ connectDB \} from "\.\.\/lib\/db";\r?\n?/g, '');
code = code.replace(/import \{ SiteData \} from "\.\.\/lib\/models\/SiteData";\r?\n?/g, '');
code = code.replace(/import \{ Certificate \} from "\.\.\/lib\/models\/Certificate";\r?\n?/g, '');
code = code.replace(/import \{ Media \} from "\.\.\/lib\/models\/Media";\r?\n?/g, '');
code = code.replace(/import \{ AdminUser \} from "\.\.\/lib\/models\/AdminUser";\r?\n?/g, '');

// Replace model usages
code = code.replace(/\bSiteData\b/g, 'mongoose.models.SiteData');
code = code.replace(/\bCertificate\b/g, 'mongoose.models.Certificate');
code = code.replace(/\bMedia\b/g, 'mongoose.models.Media');
code = code.replace(/\bAdminUser\b/g, 'mongoose.models.AdminUser');

// Because we replaced ALL occurrences, we might have replaced things we didn't want to, but in api.ts these are only used for DB queries.
// Fix connectDB
code = code.replace(/await connectDB\(\);/g, 'const { connectDB } = await import("../lib/db"); await connectDB(); const mongoose = (await import("mongoose")).default;');

fs.writeFileSync('src/lib/api.ts', code);
console.log('Fixed api.ts');
