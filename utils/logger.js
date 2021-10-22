import log4js from "log4js";
const logger = log4js.getLogger();
logger.level = "error"
log4js.configure({
    appenders: {
        everything: {
            type: 'dateFile',
            pattern: "yyyy-MM-dd",
            keepFileExt: true,  //
            maxLogSize: 1024 * 1024 * 1, //1024 * 1024 * 1 = 1M
            backups: 2,     //
            alwaysIncludePattern: true,     //
            daysToKeep: 3, //
            filename: './logs/BuhBuh.log',
        },
    },
    categories: {
        default: {
            appenders: ["everything"],
            level: "debug"
        }
    },
    "pm2": true,
    "replaceConsole": true
});

export default logger