const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const logFormat = printf(({ timestamp, level, message, status, request }) => {
  return `[${timestamp}] ${level}: ${message} - Status: ${status}, Request: ${JSON.stringify(
    request
  )}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "message-log.log" }),
  ],
});

module.exports = logger;
