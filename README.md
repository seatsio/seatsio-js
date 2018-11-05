# seatsio-js
This is the official JavaScript client (for both Node and browser) library for [Seats.io V2 REST API](https://docs.seats.io/docs/api-overview).

[![Build Status](https://travis-ci.org/seatsio/seatsio-js.svg?branch=master)](https://travis-ci.org/seatsio/seatsio-js)

# WIP
Please note that this project is still in development.

## Installing
Using npm:

You can alternatively include the latest release from GitHub:

## Examples

### Creating a chart and an event
Once you create a new `SeatsioClient` using your secret key, you can create charts and then events. You can find your secret key in the Settings section of your account: https://app.seats.io/settings.

```
const SeatsioClient = require('seatsio-js');
const seatsio = new SeatsioClient(<SECRET KEY>);
var chart = await seatsio.charts.create();
var event = await seatsio.events.create(chart.key);
console.log(`Created event with key: ${event.key}`);
```

## Error Handling
## Running the tests
## Versioning
## Built With
## License
