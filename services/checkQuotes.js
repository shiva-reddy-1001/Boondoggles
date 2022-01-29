

const {ClientRequest} = require('../Models/clientRequestModel');
const {User} = require('../Models/UserModel');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cheerio = require('cheerio');

const checkQuotes = () => {
    //console.log("checking quotes");
    ClientRequest.find((err,docs) => {
        
        if(err) {
            console.log(err);
        }
        else {
            docs.forEach(doc => {
                //console.log(doc);
                const url = 'https://www.bing.com/search?q='+ doc.name +'+nse+share+price';
                axios.get(url)
                .then(res => {
                    const $ = cheerio.load(res.data);
                    const price = $('#Finance_Quote');
                    const value = parseInt(doc.price.split(" ")[0]);
                    const marketVal = parseInt(price.children().first().text().split(",").join(""));
                    //console.log(value, price.children().first().text());
                    //console.log(value, marketVal);
                    if( marketVal === value) {
                        console.log("Price is same",doc.name,marketVal,value);
                        sendMail(doc.trader,doc.client,doc.name,value,marketVal);
                        ClientRequest.deleteOne({_id: doc._id}, (err,doc) => {
                            if(err) {
                                console.log(err);
                            }
                            else {
                                console.log("deleted");
                            }
                        })
                    }
                    //console.log(doc.name,doc.price, value);
                })
                .catch(err => {
                    console.log(err);
                })
            })
        }
    })
};

const sendMail = (trader, client, name, value, marketVal) => {
    
    User.findOne({ username : trader}, (err,user) => {
        if(err) {
            console.log(err);
        }
        else {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'reddyshiva1001@gmail.com',
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: 'reddyshiva@gmail.com',
                to: user.email,
                subject: 'NSE Share Price Alert',
        text: 'Hello '+ trader +',\n\n'+ client +' has requested for share price alert for '+ name +'.\n\n'+
        'Current share price is '+ marketVal +' and the requested value was '+ value +'\n\n'+
        'Regards,\n\n'+
        'NSE Share Price Alert'
            };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }})
}


module.exports = { checkQuotes };