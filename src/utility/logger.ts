import { nodeModuleNameResolver } from 'typescript';
import winston from 'winston'
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple(), })
    ],
});
if (process.env.NODE_ENV === 'production') {
    logger.add(new winston.transports.File({ filename: 'combined.log' }))
    logger.add(new winston.transports.File({ filename: 'error.log', level: 'error' }))
}

export default function GetLogger() {
    return logger
}
