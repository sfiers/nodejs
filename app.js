const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('messageLogged', function(){
    console.log('Listerner Called')
})

emitter.emit('messageLogged');