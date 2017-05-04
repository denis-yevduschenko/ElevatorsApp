var winston = require('winston');

var logger;

var runFilename = module.parent.parent.filename;

if (runFilename.match(/tests/)){
    logger = new (winston.Logger)({
        transports: []
    });
} else {
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                colorize: true,
                level: 'info'
            }),
            new (winston.transports.File)({
                filename: 'file.log',
                timestamp: true,
                level: 'debug'
            })
        ]
    });
}

module.exports = logger;