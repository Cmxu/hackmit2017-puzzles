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

assert(ciphertext.length == cleartext.length);

var substitutions = {};

for (var i = 0; i < ciphertext.length; i++) {
    if (!substitutions.hasOwnProperty(ciphertext[i]))
        substitutions[ciphertext[i]] = cleartext[i];
}

function dfs(start, visited) {
    if (substitutions.hasOwnProperty(start) && visited.indexOf(substitutions[start]) < 0)
        return start + '->' + dfs(substitutions[start], start + visited);
    else
        return start;
}

var lengths = {};

var paths = Object.keys(substitutions)
    .map(x => dfs(x, ''))
    .sort()
    .sort((a, b) => a.length - b.length)
    .forEach(x => {
        if (lengths.hasOwnProperty(x.length))
            lengths[x.length].push(x);
        else
            lengths[x.length] = [x];
    });

function porder(length) {
    if (lengths[length].length == 1)
        return;

    var ord = lengths[length][0].split('->');
    for (var i = 0; i < lengths[length].length; i++) {
        for (var j = 0; j < ord.length; j++) {
            if (lengths[length][i].indexOf(ord[j]) < 0)
                return lengths[length];
        }
    }

    var res = []
    for (var i = 0; i < ord.length; i++) {
        res.push(lengths[length].filter(x => x.indexOf(ord[i]) == 0)[0]);
    }

    if (res.length == ord.length) {
        var first = res[0].split('->')[0];
        for (var i = 1; i < res.length; i++)
            res[i] = res[i].replace(new RegExp(first, "g"), "_");
        res.splice(0, 0, "_->" + first);
    }

    lengths[length] = res.reverse();
}


Object.keys(lengths).forEach(porder);

paths = [].concat.apply([], Object.keys(lengths).map(x => lengths[x]));
console.log(paths);

paths.map(x => x.substring(0, 4)).forEach(x => {
    x = x.split('->');
    problem = problem.replace(new RegExp(x[0], "g"), x[1]);
});

console.log(problem.substring(0, problem.length - 3) + '.jar');