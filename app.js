const Logger = require('./logger');

const logger = new Logger();

logger.on('messageLogged', (arg) => {
    console.log('Listerner Called', arg)
})

logger.log('messageLogged');