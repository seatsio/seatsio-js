# seatsio-js, the official Seats.io JS library

[![Build](https://github.com/seatsio/seatsio-js/workflows/Build/badge.svg)](https://github.com/seatsio/seatsio-js/actions/workflows/build.yml)
[![npm version](https://badge.fury.io/js/seatsio.svg)](https://badge.fury.io/js/seatsio)

This is the official JavaScript client library for the [Seats.io V2 REST API](https://docs.seats.io/docs/api-overview).

> **Read This First!**
> 
> This library is intended mainly for **serverside (Node)** use. 
>
> `seatsio-js` requires your seats.io secret key. This key carries many privileges, including creating events, booking and releasing seats, and more. If you use this lib in a browser, you are exposing your secret key to your user.   
> So, while `seatsio-js` technically works in clientside code too, it's almost never a good idea to do so. 
>
> **Only use this in browser code if you know what you're doing (e.g. if you're building a password-protected backoffice application for admins)**. You have been warned :) 

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

seatsio-js follows semver since v54.4.0.

Please note that any version below v2 is not production ready.

## Usage

### General instructions

To use this library, you'll need to create a `SeatsioClient`:

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)
...
```

You can find your _workspace secret key_ in the [settings section of the workspace](https://app.seats.io/workspace-settings). It is important that you keep your _secret key_ private and not expose it in-browser calls unless it is password protected.

The region should correspond to the region of your account:

- `Region.EU()`: Europe
- `Region.NA()`: North-America
- `Region.SA()`: South-America
- `Region.OC()`: Oceania

If you're unsure about your region, have a look at your [company settings page](https://app.seats.io/company-settings).

### Creating a chart and an event

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)
let chart = await client.charts.create()
let event = await client.events.create(chart.key)
console.log(`Created a chart with key ${chart.key} and an event with key: ${event.key}`)
```

### Booking objects

Booking an object changes its status to `booked`. Booked seats are not selectable on a rendered chart.

[https://docs.seats.io/docs/api-book-objects](https://docs.seats.io/docs/api-book-objects).

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)
await client.events.book(<AN EVENT KEY>, ['A-1', 'A-2'])
```

### Booking objects that are on `HOLD`

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)
await client.events.book(<AN EVENT KEY>, ["A-1", "A-2"], <A HOLD TOKEN>)
```

### Booking general admission (GA) areas

Either

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)
await client.events.book(<AN EVENT KEY>, ["GA1", "GA1", "GA1"])
```

Or:

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)
await client.events.book(<AN EVENT KEY>, {"objectId": "GA1", "quantity" : 3})
```

### Releasing objects

Releasing objects changes its status to `free`. Free seats are selectable on a rendered chart.

[https://docs.seats.io/docs/api-release-objects](https://docs.seats.io/docs/api-release-objects).

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)
await client.events.release(<AN EVENT KEY>, ["A-1", "A-2"])
```

### Changing object status

Changes the object status to a custom status of your choice. If you need more statuses than just booked and free, you can use this to change the status of a seat, table or booth to your own custom status.

[https://docs.seats.io/docs/api-custom-object-status](https://docs.seats.io/docs/api-custom-object-status)

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)
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

### Retrieving object category and status (and other information)

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)
let objectInfos = await client.events.retrieveObjectInfos(event.key, ['A-1', 'A-2'])

console.log(objectInfos['A-1'].categoryKey)
console.log(objectInfos['A-1'].categoryLabel)
console.log(objectInfos['A-1'].status)
    
console.log(objectInfos['A-2'].categoryKey)
console.log(objectInfos['A-2'].categoryLabel)
console.log(objectInfos['A-2'].status)
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
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)
await client.eventReports.byStatus(<AN EVENT KEY>, <OPTIONAL FILTER>)
```

### Listing all charts

You can list all charts using `listAll()` method which returns an asynchronous iterator `AsyncIterator`. You can use `for await` loop to retrieve all charts.

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>)

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

### Creating a workspace

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <COMPANY ADMIN KEY>)
await client.workspaces.create('a workspace');
```

### Creating a chart and an event with the company admin key

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <COMPANY ADMIN KEY>, <WORKSPACE PUBLIC KEY>)
let chart = await client.charts.create()
let event = await client.events.create(chart.key)
console.log(`Created a chart with key ${chart.key} and an event with key: ${event.key}`)
```

## Error Handling
When an API call results in an error, a rejected promise is returned with a value that looks like

```json
{
  "errors": [{ "code": "RATE_LIMIT_EXCEEDED", "message": "Rate limit exceeded" }],
  "messages": ["Rate limit exceeded"],
  "requestId": "123456",
  "status": 429
}
```

## Rate limiting - exponential backoff

This library supports [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff).

When you send too many concurrent requests, the server returns an error `429 - Too Many Requests`. The client reacts to this by waiting for a while, and then retrying the request.
If the request still fails with an error `429`, it waits a little longer, and try again. By default this happens 5 times, before giving up (after approximately 15 seconds).

To change the maximum number of retries, create the `SeatsioClient` as follows:

```js
import { SeatsioClient, Region } from 'seatsio'

let client = new SeatsioClient(Region.EU(), <WORKSPACE SECRET KEY>).setMaxRetries(3)
```

Passing in 0 disables exponential backoff completely. In that case, the client will never retry a failed request.
