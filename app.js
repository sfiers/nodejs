function sayHello(name) {
    console.log('Hello ' + name);
}

// sayHello('Simon');
console.log('simon') // attached to the global object => similar to the window object in Chrome
global.console.log('simon')