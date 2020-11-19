const DUPLICATED_VALUES = 'DUPLICATED_VALUES';

const getError = (err) => {
  const result = {
    code: 500,
    error: { status: 'ERROR', message: err.message, data: null },
  };
  if (err.code && err.code === 11000) {
    result.code = 400;
    result.error.status = DUPLICATED_VALUES;
    result.error.message = err.keyValue;
    result.error.data = null;
  }
  return result;
};
module.exports = getError;
