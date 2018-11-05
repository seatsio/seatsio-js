const Axios = require('axios');
const Accounts = require('./Accounts/Accounts.js');
const Charts = require('./Charts/Charts.js');
const Events = require('./Events/Events.js');
const Subaccounts = require('./Subaccounts/Subaccounts.js');
const HoldTokens = require('./HoldTokens/HoldTokens.js');
const ChartReports = require('./Reports/ChartReports.js');
const EventReports = require('./Reports/EventReports.js');

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
    this.holdTokens = new HoldTokens(this.client);
    this.accounts = new Accounts(this.client);
    this.chartReports = new ChartReports(this.client);
    this.eventReports = new EventReports(this.client);
  }
}

module.exports = SeatsioClient;
