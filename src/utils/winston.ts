import winston from 'winston';
import chalk from 'chalk';

export const logger = winston.createLogger({
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'log' })],
    format: winston.format.printf(log => `[${date()}] ${log.message}`)
});

export const logError = (error: string | Error | object) => logger.log('error', chalk.red(error));
export const logInfo = (info: string) => logger.log('info', chalk.cyan(info));
export const logWarn = (warn: string | Error) => logger.log('warn', chalk.yellow(warn));
export const logUncaught = (error: string) => logger.log('error', chalk.magenta(error));

const date = () => {
    const d = new Date();
    return `${d.getDay() > 9 ? d.getDay() : '0' + d.getDay()}.${
        d.getMonth() > 9 ? d.getMonth() : '0' + d.getMonth()
    }.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};
