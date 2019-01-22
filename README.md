### Just for kicks

Must meet this criteria when creating the first batch of tests
```
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
.goto('http://localhost:3000/')
.click('.btn')
.goto('http://localhost:3000/complete')
.end()
.then(function (result) {
  console.log(result)
})
.catch(function (error) {
  console.error('Error:', error);
});
```

Probably need to extend the functionality of the framework to watch for events. These events can be put on DOM elements and can be triggered when a certain criteria is met.

It's almost as if the actions are getting validated for criteria put into the tests.

The trainer may look something like this:
```
nightmare
.goto('http://localhost:3000/')
.start()
.click('.btn')
.goto('http://localhost:3000/complete')
.end()
.then(function (result) {
  console.log(result)
})
.catch(function (error) {
  console.error('Error:', error);
});
```