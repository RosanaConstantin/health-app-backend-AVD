let index = 0;

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