# restify-rest-client

Yet another REST client based on Restify.


## Install

```
npm install restify-rest-client
```


## Examples

```javascript
'use strict';

var RestClient = require('restify-rest-client');
var options = {
  restify: {
    url: 'https://api.example.org'
  }
};

var restClient = new RestClient(options);
restClient.get('/users/100/groups', function (err, req, res, body) {
  if (err) {
    return console.error(err);
  }

  console.log('body: %s', JSON.stringify(body));
});
```

You can refer to other [examples](/examples) as a starting point for your web applications.


## Options

  * **options**
      * **restify** - the restify json client options. Read more [here](http://restify.com/#jsonclient)
      * **credentialsProvider** - the credentials provider instance. Default: `new DefaultCredentialsProvider()`


## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.