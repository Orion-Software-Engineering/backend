const morgan = require('morgan')
import {logger} from "../logger/logger";

export const morganMiddleware = morgan (
    ':remote-addr :user-agent :http-version :method :url :status - :response-time ms',
    {
        stream: {
            // Configure Morgan to use our custom logger with the http severity
            write: (message:string) => logger.http(message.trim()),
        },
    }
)


