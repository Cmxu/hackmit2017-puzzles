const assert = require('assert'),
    fs = require('fs');

const sections = fs.readFileSync('contents.txt')
    .toString()
    .replace(/\s+/g, '')
    .toLowerCase()
    .replace(/[\.,\-!\(\)\"\']+/g, '')
    .split('===');

var ciphertext = sections[0];
var cleartext = sections[1];
var problem = sections[2];
var deciphered = '';

assert(ciphertext.length == cleartext.length);

var substitutions = {};

for (var i = 0; i < ciphertext.length; i++) {
    substitutions[ciphertext[i]] = cleartext[i];
}

for (var i = 0; i < problem.length; i++) {
    if (substitutions[problem[i]])
        deciphered += substitutions[problem[i]];
    else
        deciphered += problem[i];
}

console.log(deciphered.substring(0, deciphered.length - 3) + '.jar');