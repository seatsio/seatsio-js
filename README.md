# seatsio-js, the official Seats.io JS client library
This is the official JavaScript client library (for both Node and browser) for the [Seats.io V2 REST API](https://docs.seats.io/docs/api-overview).

[![Build Status](https://travis-ci.org/seatsio/seatsio-js.svg?branch=master)](https://travis-ci.org/seatsio/seatsio-js)

## Installing
For Node, you can install using npm:

```sh
npm install seatsio
```
Then you can use it with require: 
```js
const { SeatsioClient } = require('seatsio')
```
For browser, you can directly include it from GitHub:

```html
<script src="https://github.com/seatsio/seatsio-js/releases/download/<RELEASE_TAG>/SeatsioClient.js"></script>
```

This library uses `async/await` introduced with ES2017 and `for await` loops which is part of the ES2018. `for await` loops gained native support from Node 10 onwards. As a result, the minimum required version for Node is 10. 

## Versioning

seatsio-js only uses major version numbers: v2, v3, v4 etc. Each release - backwards compatible or not - receives a new major version number.

The reason: we want to play safe and assume that each release _might_ break backwards compatibility.

Please note that any version below v2 is not production ready.

## Examples

### Creating a chart and an event
Once you create a new `SeatsioClient` using your _secret key_, you can create _charts_ and then _events_. You can find your _secret key_ in the Settings section of your account: https://app.seats.io/settings. It is important that you keep your _secret key_ private and not expose it in-browser calls unless it is password protected.

```js
let client = new SeatsioClient(<SECRET KEY>)
let chart = await client.charts.create()
let event = await client.events.create(chart.key)
console.log(`Created a chart with key ${chart.key} and an event with key: ${event.key}`)
```

### Booking objects

Booking an object changes its status to `booked`. Booked seats are not selectable on a rendered chart.

[https://docs.seats.io/docs/api-book-objects](https://docs.seats.io/docs/api-book-objects).

```js
let client = new SeatsioClient(<SECRET KEY>)
await client.events.book(<AN EVENT KEY>, ['A-1', 'A-2'])
```

### Booking objects that are on `HOLD`

```js
let client = new SeatsioClient(<SECRET KEY>)
await client.events.book(<AN EVENT KEY>, ["A-1", "A-2"], <A HOLD TOKEN>)
```

### Booking general admission (GA) areas

Either

```js
let client = new SeatsioClient(<SECRET KEY>)
await client.events.book(<AN EVENT KEY>, ["GA1", "GA1", "GA1"])
```

Or:

```js
let client = new SeatsioClient(<SECRET KEY>)
await client.events.book(<AN EVENT KEY>, {"objectId": "GA1", "quantity" : 3})
```

### Releasing objects

Releasing objects changes its status to `free`. Free seats are selectable on a rendered chart.

[https://docs.seats.io/docs/api-release-objects](https://docs.seats.io/docs/api-release-objects).

```js
let client = new SeatsioClient(<SECRET KEY>)
await client.events.release(<AN EVENT KEY>, ["A-1", "A-2"])
```

### Changing object status

Changes the object status to a custom status of your choice. If you need more statuses than just booked and free, you can use this to change the status of a seat, table or booth to your own custom status.

[https://docs.seats.io/docs/api-custom-object-status](https://docs.seats.io/docs/api-custom-object-status)

```js
let client = new SeatsioClient(<SECRET KEY>)
await client.events.changeObjectStatus(<AN EVENT KEY>, ["A-1", "A-2"], "unavailable")
```
### Listing status changes

`statusChanges` method returns a `Lister`. You can use `statusChanges().all()`, which returns an AsyncIterator, in a `for await` loop to iterate over all status changes.

```js
for await (let statusChange of client.events.statusChanges(<AN EVENT KEY>).all()) {
    //Do something with the status change
}
```

You can alternatively use the paginated methods to retrieve status changes. To list status changes that comes after or before a given status change, you can use `statusChanges().pageAfter()` and `statusChanges().pageBefore()` methods.

```js
await client.events.statusChanges(<AN EVENT KEY>).firstPage(<OPTIONAL parameters>, <OPTIONAL pageSize>)
await client.events.statusChanges(<AN EVENT KEY>).pageAfter(<A STATUS CHANGE ID>, <OPTIONAL parameters>, <OPTIONAL pageSize>) 
await client.events.statusChanges(<AN EVENT KEY>).pageBefore(<A STATUS CHANGE ID>, <OPTIONAL parameters>, <OPTIONAL pageSize>) 
```  

You can also pass an optional parameter to _filter_, _sort_ or _order_ status changes. For this parameter, you can you use the helper class called `StatusChangesParams`.  

```js
const {StatusChangesParams} = require('seatsio')
let parameter = new StatusChangesParams().withFilter('testFilter')
let parameter = new StatusChangesParams().sortByObjectLabel()
let parameter = new StatusChangesParams().sortByDate()
let parameter = new StatusChangesParams().sortByStatus()
let parameter = new StatusChangesParams().sortDescending()
let parameter = new StatusChangesParams().sortAscending()
```
A combination of filter, sorting order and sorting option is also possible. 

```js
let parameter = new StatusChangesParams().withFilter('testFilter').sortByStatus().sortAscending()
```

### Event reports

Want to know which seats of an event are booked, and which ones are free? That’s where reporting comes in handy.

The report types you can choose from are:
- byStatus
- byCategoryLabel
- byCategoryKey
- byLabel
- byOrderId

[https://docs.seats.io/docs/api-event-reports](https://docs.seats.io/docs/api-event-reports)

```js
let client = new SeatsioClient(<SECRET KEY>)
await client.eventReports.byStatus(<AN EVENT KEY>, <OPTIONAL FILTER>)
```

### Listing all charts

You can list all charts using `listAll()` method which returns an asynchronous iterator `AsyncIterator`. You can use `for await` loop to retrieve all charts.

```js
let client = new SeatsioClient(<SECRET KEY>)

for await(let chart of client.charts.listAll()){
    console.log(`Chart key: ${chart.key}`)
}
```

### Listing charts page by page

E.g. to show charts in a paginated list on a dashboard.

Each page contains an `items` array of charts, and `nextPageStartsAfter` and `previousPageEndsBefore` properties. Those properties are the chart IDs after which the next page starts or the previous page ends.

```js
// ... user initially opens the screen ...

let firstPage = client.charts.listFirstPage();
firstPage.items.forEach(chart => console.log(`Chart key: ${chart.key}`));
```

```js
// ... user clicks on 'next page' button ...

let nextPage = client.charts.listPageAfter(firstPage.nextPageStartsAfter);
nextPage.items.forEach(chart => console.log(`Chart key: ${chart.key}`));
```

```js
// ... user clicks on 'previous page' button ...

let previousPage = client.charts.listPageBefore(nextPage.previousPageEndsBefore);
previousPage.items.forEach(chart => console.log(`Chart key: ${chart.key}`));
```

## Error Handling
When an API call results in an error, a rejected promise is returned with the response received from the server. This response contains a message string describing what went wrong, and also two other properties:

- `messages`: an array of error messages that the server returned. In most cases, this array will contain only one element.
- `requestId`: the identifier of the request you made. Please mention this to us when you have questions, as it will make debugging easier.
