// Prisma error codes -> friendly messages.
const PRISMA_ERRORS = {
  P2002: "A record with this value already exists.",
  P2003: "Referenced record does not exist.",
  P2025: "Record not found.",
  P2014: "A required relation would be violated.",
  P2011: "A required value is missing.",
};

function notFound(req, res, next) {
  res.status(404).json({ success: false, message: "Route not found" });
}

function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error("[ERROR]", err);

  if (err && err.code && PRISMA_ERRORS[err.code]) {
    return res.status(400).json({
      success: false,
      message: PRISMA_ERRORS[err.code],
      data: { code: err.code },
    });
  }

  if (err.name === "MulterError") {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "File is too large. Maximum upload size exceeded."
        : `Upload error: ${err.message}`;
    return res.status(400).json({ success: false, message });
  }

  const status = err.status || err.statusCode || 500;
  return res.status(status).json({
    success: false,
    message:
      status >= 500
        ? "An unexpected error occurred. Please try again later."
        : err.message || "Something went wrong",
  });
}

module.exports = { notFound, errorHandler };
