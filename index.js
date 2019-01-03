const
    serverless  = require('serverless-http'),
    express     = require('express'),
    bodyParser  = require('body-parser'),
    config      = require('./config/' + process.env.STAGE + '.json'),
    holidays    = require('./data/holidays.json'),
    commands    = require('./data/commands.json'),
    _           = require('lodash'),
    crypto      = require('crypto');

const app         = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const holidayRes = {
    "response_type": "ephemeral",
    "text": "Fiestas Madrid 2019",
    "attachments": _.map(holidays.data, d => {
        return {"text" : d.date + " : " + d.title};
})
};

const helpRes = {
    "response_type": "ephemeral",
    "text": "Please use one of these commands.",
    "attachments": _.map(commands.data, c => {
        return {"text": c.command}
    })
};

app.post('/', (req, res) => {
    const { text } = req.body;

let resData = {};
if(text == 'holidays'){
    resData = holidayRes
}else{
    resData = helpRes
}

res.send(resData);
});

module.exports.handler = serverless(app);