import winston from 'winston'
import WinstonDaily from 'winston-daily-rotate-file'
import { existsSync, mkdirSync } from 'fs'

const { combine, timestamp, printf, colorize } = winston.format

const logDir = __dirname + '/../../logs'

if (!existsSync(logDir)) mkdirSync(logDir)

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
}

winston.addColors(colors)

const getLevel = () => process.env.NODE_ENV === 'production' ? 'debug' : 'http'

// Log Format
const logFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    printf((info) => {
        if (info.stack) {
            return `${info.timestamp} ${info.level}: ${info.message} \n Error Stack: ${info.stack}`
        }
        return `${info.timestamp} ${info.level}: ${info.message}`
    })
)

// 콘솔에 찍힐 때는 색깔을 구변해서 로깅해주자.
const consoleOption = {
    handleExceptions: true,
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' })
    )
}

const transports = [
    new winston.transports.Console(consoleOption),
    new WinstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/error',
        filename: '%DATE%.error.log',
        maxFiles: 7,
        zippedArchive: true
    }),
    new WinstonDaily({
        level: 'debug',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/info',
        filename: '%DATE%.log',
        maxFiles: 7,
        zippedArchive: true
    })
]

export const logger = winston.createLogger({
    level: getLevel(),
    levels,
    format: logFormat,
    transports
})
