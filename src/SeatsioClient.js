const Axios = require('axios');
const Accounts = require('./Accounts/Accounts.js');
const Charts = require('./Charts/Charts.js');
const Events = require('./Events/Events.js');
const Subaccounts = require('./Subaccounts/Subaccounts.js');

/*
const EventReports = require('./Reports/EventReports.js');
const ChartReports = require('./Reports/Accounts.js');
const Events = require('./Events/Events.js');
const HoldTokens = require('./HoldTokens/HoldTokens');
*/

class SeatsioClient {

  constructor(secretKey, baseUrl = 'https://api.seatsio.net/'){

    this.client = Axios.create({
      baseURL: baseUrl,
      auth: {
        username: secretKey,
        password: null,
      }
    });

    this.charts = new Charts(this.client);
    this.events = new Events(this.client);
    this.subaccounts = new Subaccounts(this.client);

    /*
    this.eventReports = new EventReports(this.client);
    this.chartReports = new ChartReports(this.client);
    this.accounts = new Accounts(this.client);

    this.holdTokens = new HoldTokens(this.client);
    */
  }
}

module.exports = SeatsioClient;
