// export individual
const info = (text) => {
  console.log('INFO:', text);
  return text;
};

module.exports.error = (text) => {
  console.log('ERROR:', text);
  return text;
};

// otra forma
module.exports.info = info;
