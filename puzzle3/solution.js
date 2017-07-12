var req = require('request');
var fs = require('fs');

var words = fs.readFileSync('transcript.txt').toString().toLowerCase().replace(/[\.,;:'"\\\!\?/]/g, '').split(/[\s0-9\-]+/g);
words = Array.from(new Set(words));

console.log(words.length);

words.forEach(x => console.log(x));
const url = 'https://the.delorean.codes/api/examples?username=ashertrockman';

function post(word, cb) {
    req.post({
            url: 'https://the.delorean.codes/api/decode',
            form: {
                username: 'Cmxu',
                codeword: word
            }
        },
        (err, res, body) => {
            try {
                const b = JSON.parse(body);
                if (b.well_formed) {
                    console.log(word, b.message);
                    return cb(b.message);
                }
            } catch (e) {}
            cb(null);
        });
}

const goal = 'the hubspot of hotels but like houzz';
var want = 't';
var cursor = 24;
var code = 'is a missing can your precisely be yes amounted never letting trying we couldve gullible totaled kiss street fish synchronization cat birth travel store ';

var invalid = {}

function tryit(i) {
    words.forEach(x => {
        post(code + x, (ret) => {
            if (invalid[i])
                return;

            if (ret == null)
                return;

            if (ret[ret.length - 1] == want) {
                var keep = x;
                cursor += 1;
                want = goal[cursor];
                console.log('new goal', want);
                code += keep + ' ';
                console.log(code, '->', ret);
                invalid[i] = true;
                tryit(i + 1);
            }
        });
    });
}

tryit(0);