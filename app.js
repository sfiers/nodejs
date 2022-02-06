const os = require('os')

const totalMem = os.totalmem();
const freeMem = os.freemem();

console.log(`total memory: ${totalMem}`);
console.log(`free memory: ${freeMem}`);