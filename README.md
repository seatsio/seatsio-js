# seatsio-js
This is the official JavaScript client (for both Node and browser) library for [Seats.io V2 REST API](https://docs.seats.io/docs/api-overview).

[![Build Status](https://travis-ci.org/seatsio/seatsio-js.svg?branch=master)](https://travis-ci.org/seatsio/seatsio-js)

# WIP
Please note that this project is still in development.

## Installing
Using npm:

```sh
npm install seatsio
```
Then, you can use it with `require`

```js
const SeatsioClient = require('seatsio');
```

You can alternatively include the latest release from GitHub:

```html
<script src=""></script>
```

## Examples

Due to the asynchronous nature of the API calls, this library uses `async/await` which is part of the ES 8. `for await` loops for asynchronous iterators gained native support from Node 10 onwards.

### Creating a chart and an event
Once you create a new `SeatsioClient` using your secret key, you can create charts and then events. You can find your secret key in the Settings section of your account: https://app.seats.io/settings. It is important that you keep your `secret key` private and not expose it in-browser calls unless it is password protected.

```js
const client = new SeatsioClient(<SECRET KEY>);
var chart = await client.charts.create();
var event = await client.events.create(chart.key);
console.log(`Created a chart with key ${chart.key} and an event with key: ${event.key}`);
```

### Booking objects

Booking changes the object status to `booked`. Booked seats are not selectable on a rendered chart. Read more about our API [here](https://docs.seats.io/docs/api-book-objects).
```js
const client = new SeatsioClient(<SECRET KEY>);
await client.events.book(<AN EVENT KEY>, ['A-1', 'A-2']);
```

### Booking objects that are on `HOLD`


```js
const client = new SeatsioClient(<SECRET KEY>);
await client.events.book(<AN EVENT KEY>, ["A-1", "A-2"], <A HOLD TOKEN>);
```

### Booking general admission (GA) areas

```js
const client = new SeatsioClient(<SECRET KEY>);
await client.events.book(<AN EVENT KEY>, ["GA1", "GA1", "GA1"]);
```

Alternatively, you can also do:

```js
await client.events.book(<AN EVENT KEY>, {"objectId": "GA1", "quantity" : 3});
```

### Releasing objects

Releasing changes the object status to `free`. Free seats are selectable on a rendered chart. More about it [here](https://docs.seats.io/docs/api-release-objects).

```js
const client = new SeatsioClient(<SECRET KEY>);
await client.events.release(<AN EVENT KEY>, ["A-1", "A-2"]);
```

### Changing object status

You can use a custom status as an object status rather than using the `free` and `booked` statuses. To create a custom status:

```js
const client = new SeatsioClient(<SECRET KEY>);
await client.events.changeObjectStatus(<AN EVENT KEY>, ["A-1", "A-2"], "unavailable");
```

### Listing charts
You can list all charts using `listAll()` method which returns an asynchronous iterator `IterableAsyncCharts`. You can use `for await` loop to retrieve all charts or manually call the `next()` method.

```js
const client = new SeatsioClient(<SECRET KEY>);
var chart1 = await client.charts.create();
var chart2 = await client.charts.create();
var chart3 = await client.charts.create();
for await(let chart of client.charts.listAll()){
    console.log(`Chart key: ${chart.key}`)
}
```

## Error Handling
## Running the tests
## Versioning
## Built With
## License
