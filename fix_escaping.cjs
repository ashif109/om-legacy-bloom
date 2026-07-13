const fs = require('fs');
let code = fs.readFileSync('generate_uis.cjs', 'utf-8');

// The replace_file_content tool replaced my intended template literal backticks with escaped backticks: \` 
// I want them to be actual backticks ` so that they define a template literal string in the script.
code = code.replace(/\\`/g, '`');
// Same for \$
code = code.replace(/\\\$/g, '$');

fs.writeFileSync('generate_uis.cjs', code);
console.log('Fixed escaping in generate_uis.cjs');
