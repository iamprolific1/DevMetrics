import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

type TimeStampProps = {
  timestamp: string;
  level: string;
  message: string;
};

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log formats
const logFormats = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(
    ({ timestamp, level, message }: TimeStampProps) =>
      `[${timestamp}] ${level}: ${message}`,
  ),
);

//create a new instance of logger
const logger = winston.createLogger({
  levels,
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: logFormats }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
    }),
  ],
});

export default logger;
