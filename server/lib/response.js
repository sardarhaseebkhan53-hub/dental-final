function success(res, data, status = 200, message = "OK") {
  return res.status(status).json({ success: true, message, data });
}

function fail(res, status, message, extra = {}) {
  return res.status(status).json({
    success: false,
    message,
    errors: extra.errors,
    data: extra.data ?? null,
  });
}

// Wrap async route handlers so thrown errors reach the error middleware.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { success, fail, asyncHandler };
