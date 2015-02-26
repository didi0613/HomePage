var express = require('express');

var app = express();

// Console logging for server:
app.use(express.logger());

// Looks for static content under the current directory + /public:
app.use(express.static(__dirname + '/public'));

app.listen(3002, function () {
    console.log('App running on port 3002');
});