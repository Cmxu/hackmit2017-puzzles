var fs = require('fs');
var req = require('request');

function postAvatar(which, userToken) {
    var r = req.post({
        url: 'https://hotsinglebots.delorean.codes/api_predict/ashertrockman/predict'
    }, (err, res, body) => {
        userToken(body);

    });
    r.form().append('image', fs.createReadStream(which));
}

function nextBot(botToken) {
    req({
        url: 'https://hotsinglebots.delorean.codes/api/ashertrockman/bot/next'
    }, (err, res, body) => {
        botToken(body);
    });
}

function matchBot(userTok, botTok, cb) {
    req.post({
        url: 'https://hotsinglebots.delorean.codes/api/ashertrockman/bot/match',
        form: {
            user_token: userTok,
            bot_token: botTok
        }
    }, (err, res, body) => {
        console.log(body);
        cb();
    });
}

var imgs = {
    'bird': '6_bird.png',
    'ship': '8_ship.png',
    'automobile': '2828_automobile.png',
    'horse': '131_horse.png',
    'truck': '16_truck.png',
    'deer': '20_deer.png',
    'frog': '25_frog.png',
    'cat': '26_cat.png',
    'airplane': '30_airplane.png',
    'dog': '27_dog.png'
};

var cars = fs.readFileSync('cifar/train/cars.txt').toString().split('\n');

var i = 0;

trick();

function trick() {
    nextBot(botToken => {
        var b = new Buffer(botToken, 'base64');
        var label = b.toString().substring(b.toString().indexOf('label\":') + 7).split('}')[0].replace(/\"/g, '');
        if (label == 'automobile')
            postAvatar('cifar/train/' + cars[i], userToken => {
                console.log('tried', cars[i]);
                console.log(b.toString());
                i++;
                console.log('wants', label);
                matchBot(userToken, botToken, trick);
            });
        else
            trick();
    });
}