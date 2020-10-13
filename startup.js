const plenticore = require('./helpers/plenticore');

async function read() {
  return await plenticore.getData();
}

setInterval(() => {
  read().then(res => {console.log(res);});
}, 30000);
