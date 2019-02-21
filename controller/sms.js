
var gravatar = require('gravatar');
const _ = require('lodash');
const moment = require('moment')
const uc = require('upper-case')
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '5043c89d',
  apiSecret: 'jlfPc4zJfS8b9ppp'
})

exports.send = async function (req, res){
    try {
        let {from, to , messages} = req.body
        nexmo.message.sendSms(from, to, messages, {type: 'unicode'},(err, responseData) => {
            if (responseData) {
                console.log(responseData)
                res.writeHead(200, {'Content-Type': 'application/json'});  

                const obj = {
                    success:true,
                    data: responseData
                };

                res.end(JSON.stringify(obj));

            }else{
                const obj = {
                    success:false,
                    data: err
                };

                res.end(JSON.stringify(obj));
            }
        });

    } catch (error) {
        const obj = {
                    success:false,
                    data: error
                };
        res.end(JSON.stringify(obj));
    }
}
