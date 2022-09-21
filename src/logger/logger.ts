import {createLogger, transports, format, level} from 'winston'

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

// export const log = createLogger(
//     {
//         level: 'http',
//         format: combine(
//             timestamp({
//                 format: 'YYYY-MM-DD hh:mm:ss.SSS A',
//             }),
//             json()
//         ),
//         transports: [new winston.transports.Console()],
//     }
// )

