

const {ClientRequest} = require("../Models/clientRequestModel");
const axios = require("axios");
const cheerio = require('cheerio');


const analyzeText = (req,res1) => {
    const text = req.body.text;
    const language = 'en';
    const key = process.env.AZURE_TEXT_ANALYTICS_KEY;
    const endpoint = process.env.AZURE_TEXT_ANALYTICS_ENDPOINT;
    const url = `https://sl4-nlp-api.cognitiveservices.azure.com/text/analytics/v3.2-preview.1/entities/recognition/general`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': key
        }
    }
    axios.post(url, {
        documents: [
        {
            language: language,
            id: "1",
            text: text
        }
        ]
    },config)
    .then(res => {
        let name="",price="";
        res.data.documents[0].entities.forEach(doc => {
              if((doc.category=='Product' || doc.category=='Organization') && name === "" ) { 
                  name = doc.text;
              }
              else if(doc.subcategory=='Currency' && price==="") { 
                  price = doc.text;
              }
             
        })
        console.log(name,price);
        var newRequest = new ClientRequest({
            trader : req.body.trader,
            client : req.body.client,
            name : name,
            price : price
        })
        newRequest.save();
        res1.status(200).send("proccessed");
    })
    .catch(err => {
        console.log(err);
    })
}


const getQuote = (req,res1) => {
    //console.log(req.query);
    const url = 'https://www.bing.com/search?q='+ req.query.cname +'+nse+share+price';
    axios.get(url)
    .then(res => {
        const $ = cheerio.load(res.data);
        const price = $('#Finance_Quote');
        res1.send({"cname" : req.query.cname, "price": price.children().first().text()});
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = { analyzeText , getQuote};