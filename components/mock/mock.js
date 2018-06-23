let index = 0;
 let BluetoohScanner = require('../BluetoothScanner');
function increment() {
    index++;
}

function getValue() {
    return index;
}

export default {
    increment: increment,
    getValue: getValue
}