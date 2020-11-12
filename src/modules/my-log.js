/*
//export global
function info(text){
    console.log('INFO:', text);
    return text;
}

function error(text){
    console.log('ERROR:', text);
    return text;
}

module.exports = {info, error};
*/

//export individual
function info(text){
    console.log('INFO:', text);
    return text;
}

module.exports.error = function error(text){
    console.log('ERROR:', text);
    return text;
}

//otra forma 
module.exports.info = info;