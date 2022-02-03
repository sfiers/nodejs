const url = 'http://trol.com'

function log(message){
    console.log(message);
}

module.exports.hello = log;
module.exports.EndPoint = url;

console.log(module)