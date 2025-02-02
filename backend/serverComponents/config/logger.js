import winston from "winston";
let logger;

export const createLogger = (logName) => {
    return winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),
        transports: [
            new winston.transports.File({
                filename: `${logName}.log`,
                dirname: 'logs'
            })
        ]
    });
}

if(!logger){
    logger = createLogger('server');
}

export default logger;