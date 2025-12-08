require('dotenv').config();

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  
  res.status(statusCode).json({
    status: status,
    message: err.message,
    // Stack trace apenas em desenvolvimento para debug
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
};
module.exports = errorHandler;