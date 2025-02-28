// Middleware for handling unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
};

// Middleware for handling errors
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
};

// Export the middleware functions
export { unknownEndpoint, errorHandler };