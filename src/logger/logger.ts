import {createLogger, transports, format} from 'winston'

export const logger = createLogger(
    {
        level: 'http',
        transports: [
            new transports.File({
                dirname: "./logs",
                filename: "backend.log",
            }),
        ],
        format: format.combine(
            format.timestamp(),
            format.printf(({ timestamp, level, message, service }) => {
                return `[${timestamp}] ${service} ${level}: ${message}`;
            })
        ),
        defaultMeta: {
            service: "[Orion Backend]",
        },
    }
)


