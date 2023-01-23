const maxApi = require('max-api');
const finnhub = require('finnhub');
const fs = require("fs");
const { parse } = require("csv-parse");
const { randomInt } = require('crypto');


// Finnhub API key 
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "insert_private_api_key" 
const finnhubClient = new finnhub.DefaultApi()



// Handler for general market news
maxApi.addHandler("market_news", () => {
  finnhubClient.marketNews("general", {}, (error, data, response) => {
    maxApi.outlet(data)
  });
});

// Array to store data from the CSV file
// to get company id
const stockData = [];

// Read and parse the CSV file
fs.createReadStream("stocksounds.3.csv")
  .pipe(parse({}))
    .on("data", (data) =>
    // push the object row into the array
    stockData.push(data))
    .on("end", () =>
    // log the result array
    console.log(stockData))


var currCompany = 0

// Handler for getting stock information
maxApi.addHandler("get_stock_info", () => {
  // choose a random company from the stockData array
  index = randomInt(stockData.length)
  currCompany = index
    finnhubClient.companyBasicFinancials(stockData[index][0], "margin", (error, data, response) => {
	if(data != null){
		const x = data["metric"]
		
	  // check if 52WeekHigh property exists
      if (x.hasOwnProperty("52WeekHigh")) {
        maxApi.outlet(data)  
    } else{}
	}	
  });
});

/*
// Stock symbols to incorporate into later version
maxApi.addHandler("get_stock_nam", () => {
  finnhubClient.companyBasicFinancials(stockData[currCompany][0], "margin", (error, data, response) => {
    const x = data["symbol"]
      maxApi.outlet(x)  
  });
});
*/
